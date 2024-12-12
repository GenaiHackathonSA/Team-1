# currency-converter-api/currency_service.py

from typing import List
from fastapi import HTTPException

# Assuming these methods are defined in the main.py to get currency data
from .main import initialize_currency_data

async def get_available_currencies() -> List[str]:
    """
    This function returns a list of all supported currency codes.
    It builds on the existing function initialize_currency_data
    to ensure the data is loaded before retrieving it.
    
    Returns:
        List[str]: A list of currency codes available for transactions.
    """
    # Ensure currency data is initialized
    await initialize_currency_data()
    
    try:
        # Fetching currencies from the app state
        currencies = app.state.currencies
        return list(currencies.keys())
    except KeyError:
        # Handle the case where the currencies might not be loaded
        raise HTTPException(status_code=500, detail="Currency data is not loaded properly.")
