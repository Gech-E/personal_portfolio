"""Regression tests: protect public location questions from vendor demo matches."""
import pathlib
import sys
import unittest
from unittest.mock import patch

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))

from services.rag_pipeline import location_question, process_query
from services.retrieval import retrieve


class PortfolioChatTests(unittest.TestCase):
    def test_location_phrasings(self):
        for query in ["where does he live", "Where is Getachew based?", "What city does Getachew live in?", "Where is his location?", "What is his home address?"]:
            with self.subTest(query=query):
                self.assertTrue(location_question(query))

    def test_location_response_from_public_data(self):
        for query in ["where does he live", "Where is Getachew based?", "What is his home address?"]:
            with self.subTest(query=query):
                result = process_query(query)
                self.assertEqual(result.intent, "contact")
                self.assertIn("Addis Ababa, Ethiopia", result.reply)
                self.assertNotIn("Vendor Recommendation", result.reply)
                self.assertIn("not publicly listed", result.reply)

    def test_location_works_without_llm(self):
        with patch("services.rag_pipeline.client", side_effect=AssertionError("LLM should not run")):
            self.assertIn("Addis Ababa", process_query("where does he live").reply)

    def test_project_question_still_retrieves_vendor_project(self):
        result = retrieve("Vendor Recommendation System", intent="projects", top_k=3)
        self.assertTrue(result)
        self.assertEqual(result[0][0]["id"], "project-vendor-recommendation")

    def test_contact_intent_never_returns_project(self):
        result = retrieve("live", intent="contact", top_k=5)
        self.assertFalse(any(c["category"] == "projects" for c, _ in result))


if __name__ == "__main__":
    unittest.main()
