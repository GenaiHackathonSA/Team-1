package com.fullStack.expenseTracker.enums;

/**
 * This enumeration defines the available currencies in the expense tracker application.
 * It facilitates a centralized list of supported currencies for consistency across the application.
 */
public enum ECurrency {
    USD("United States Dollar"),
    EUR("Euro"),
    GBP("British Pound Sterling"),
    JPY("Japanese Yen"),
    AUD("Australian Dollar"),
    CAD("Canadian Dollar"),
    CHF("Swiss Franc"),
    CNY("Chinese Yuan"),
    SEK("Swedish Krona"),
    NZD("New Zealand Dollar");

    private final String currencyName;

    ECurrency(String currencyName) {
        this.currencyName = currencyName;
    }

    public String getCurrencyName() {
        return currencyName;
    }

    /**
     * Get a list of available currencies as an array of strings.
     *
     * @return an array of available currency names.
     */
    public static String[] getAvailableCurrencies() {
        ECurrency[] currencies = values();
        String[] currencyNames = new String[currencies.length];
        
        for (int i = 0; i < currencies.length; i++) {
            currencyNames[i] = currencies[i].name();
        }
        
        return currencyNames;
    }
}
