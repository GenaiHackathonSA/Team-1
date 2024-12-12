import os
import json
from typing import Dict, Any

class CurrencyManager:
    def __init__(self):
        self.currencies: Dict[str, str] = {}
        self.conversion_rates: Dict[str, float] = {}

    def initialize_currency_data(self) -> None:
        """Load currency data and conversion rates into a format suitable for easy access."""
        base_dir = "./static_data"  # Directory where the JSON files are stored
        currencies_file = os.path.join(base_dir, "currencies.json")
        conversion_rates_file = os.path.join(base_dir, "currency_rates_usd.json")

        # Load the currencies data
        try:
            with open(currencies_file, "r", encoding="UTF-8") as file:
                self.currencies = json.load(file)
        except (FileNotFoundError, json.JSONDecodeError) as e:
            print(f"Error loading currencies: {e}")
            raise

        # Load the conversion rates data
        try:
            with open(conversion_rates_file, "r", encoding="UTF-8") as file:
                self.conversion_rates = json.load(file)
        except (FileNotFoundError, json.JSONDecodeError) as e:
            print(f"Error loading conversion rates: {e}")
            raise

        print("Currencies and conversion rates loaded successfully!")

    def convert_currency(self, amount: float, source: str, target: str) -> Dict[str, Any]:
        """Convert an amount from source currency to target currency."""
        # Validate input currencies
        if not self.is_valid_currency(source) or not self.is_valid_currency(target):
            return {"error": "Invalid currency code"}

        # Convert amount from `source` to USD
        if source == "usd":
            usd_amount = amount
        else:
            usd_amount = amount / self.conversion_rates.get(source, 1)

        # Convert USD to `target`
        if target == "usd":
            converted_amount = usd_amount
        else:
            converted_amount = usd_amount * self.conversion_rates.get(target, 1)

        return {
            "source": source,
            "target": target,
            "amount": amount,
            "converted_amount": converted_amount
        }

    def is_valid_currency(self, currency: str) -> bool:
        """Check whether a given currency code is valid according to the loaded currency data."""
        return currency in self.currencies

# Example of initializing and using the CurrencyManager
if __name__ == "__main__":
    manager = CurrencyManager()
    manager.initialize_currency_data()
    result = manager.convert_currency(100, "eur", "usd")
    print(result)
