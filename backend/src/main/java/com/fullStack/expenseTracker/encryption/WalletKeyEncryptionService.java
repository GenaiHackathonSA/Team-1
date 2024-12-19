package com.fullStack.expenseTracker.encryption;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;

@Component
public class WalletKeyEncryptionService {

    // Fetching the secret key from application properties
    @Value("${encryption.secretKey}")
    private String secretKey;

    /**
     * Encrypts the wallet key using a secure encryption algorithm 
     * ensuring that sensitive data is not stored in plaintext.
     * 
     * @param walletKey the wallet key to encrypt
     * @return the encrypted wallet key
     * @throws Exception in case encryption fails
     */
    public String encryptWalletKey(String walletKey) throws Exception {
        try {
            Key key = getKeyFromString(secretKey);
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.ENCRYPT_MODE, key);
            byte[] encryptedBytes = cipher.doFinal(walletKey.getBytes());
            return Base64.getEncoder().encodeToString(encryptedBytes);
        } catch (Exception e) {
            // Log the exception (assuming a logger is present)
            // log.error("Failed to encrypt wallet key: {}", e.getMessage());
            throw new Exception("Encryption failed: " + e.getMessage(), e);
        }
    }

    /**
     * Decrypts an encrypted wallet key providing access to the original key.
     * 
     * @param encryptedWalletKey the encrypted wallet key to decrypt
     * @return the original wallet key
     * @throws Exception in case decryption fails
     */
    public String decryptWalletKey(String encryptedWalletKey) throws Exception {
        try {
            Key key = getKeyFromString(secretKey);
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.DECRYPT_MODE, key);
            byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedWalletKey));
            return new String(decryptedBytes);
        } catch (Exception e) {
            // Log the exception (assuming a logger is present)
            // log.error("Failed to decrypt wallet key: {}", e.getMessage());
            throw new Exception("Decryption failed: " + e.getMessage(), e);
        }
    }

    private Key getKeyFromString(String key) {
        byte[] decodedKey = Base64.getDecoder().decode(key);
        return new SecretKeySpec(decodedKey, 0, decodedKey.length, "AES");
    }
}
