import sys
import os

# Add the backend directory to sys.path so its sub-packages resolve correctly
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from main import app
