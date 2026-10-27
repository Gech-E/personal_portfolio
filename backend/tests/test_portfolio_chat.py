"""Unit tests for cited RAG generation, query routing, and fail-closed behavior."""
import pathlib
import sys
import unittest
from unittest.mock import patch, MagicMock
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from services.rag_pipeline import process_query, RAGUnavailable, retrieval_query
from services.retrieval import retrieve
from services.intent_classifier import classify_intent

class PortfolioRAGTests(unittest.TestCase):
    def test_location_routes_to_contact(self):
        self.assertEqual(classify_intent("where does he live")[0], "contact")
        results = retrieve("where does he live", intent="contact")
        self.assertTrue(results)
        self.assertEqual(results[0][0]["id"], "contact")

    def test_named_project_is_retrieved(self):
        self.assertEqual(retrieve("Vendor Recommendation System", intent="projects")[0][0]["id"], "project-vendor-recommendation")

    def test_followup_reuses_last_user_query(self):
        previous = [{"role": "user", "content": "Tell me about DevTrack"},
                    {"role": "assistant", "content": "A claimed success."},
                    {"role": "user", "content": "Which technologies does it use?"}]
        lookup = retrieval_query("Which technologies does it use?", previous)
        self.assertIn("DevTrack", lookup)
        self.assertNotIn("claimed success", lookup)

    def test_no_source_returns_abstention(self):
        response = process_query("quantum interstellar teleportation equipment")
        self.assertEqual(response.mode, "no_match")
        self.assertFalse(response.sources)

    def test_unavailable_llm_does_not_fake_an_answer(self):
        with patch("services.rag_pipeline.client", side_effect=RAGUnavailable("offline")):
            with self.assertRaises(RAGUnavailable):
                process_query("Tell me about DevTrack")

    def test_valid_model_claim_has_validated_source(self):
        completion = MagicMock()
        completion.choices[0].message.content = '{"answer":"DevTrack is a project.","source_ids":["project-devtrack","invented-source"],"answerable":true}'
        fake_client = MagicMock()
        fake_client.chat.completions.create.return_value = completion
        with patch("services.rag_pipeline.client", return_value=fake_client):
            response = process_query("Tell me about DevTrack")
        self.assertEqual(response.mode, "generated")
        self.assertEqual([c["id"] for c in response.citations], ["project-devtrack"])
        self.assertTrue(response.sources)

    def test_unsupported_model_claim_abstains(self):
        completion = MagicMock()
        completion.choices[0].message.content = '{"answer":"Unsupported answer","source_ids":["fake"],"answerable":true}'
        fake_client = MagicMock()
        fake_client.chat.completions.create.return_value = completion
        with patch("services.rag_pipeline.client", return_value=fake_client):
            response = process_query("Tell me about DevTrack")
        self.assertEqual(response.mode, "no_match")

if __name__ == "__main__":
    unittest.main()
