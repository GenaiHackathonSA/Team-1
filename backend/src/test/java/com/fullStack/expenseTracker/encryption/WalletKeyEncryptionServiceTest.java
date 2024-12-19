package com.fullStack.expenseTracker.encryption;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertArrayEquals;

@SpringBootTest
public class WalletKeyEncryptionServiceTest {

    @Autowired
    private WalletKeyEncryptionService walletKeyEncryptionService;

    @Test
    public void testEncryptWalletKey() throws NoSuchAlgorithmException, InvalidKeySpecException {
        // Arrange
        String plaintextWalletKey = "my-plain-wallet-key";
        
        // Act
        byte[] encryptedKey = walletKeyEncryptionService.encryptWalletKey(plaintextWalletKey);

        // Assert
        assertNotNull(encryptedKey, "The encrypted wallet key should not be null");
        
        // To assert that encryption has occurred, we would typically perform a round-trip
        // for encryption and decryption operation, checking that the decrypted key matches
        // the original plaintext. This is a basic validation.
        String decryptedKey = walletKeyEncryptionService.decryptWalletKey(encryptedKey);
        assertArrayEquals(plaintextWalletKey.getBytes(), decryptedKey.getBytes(),
                "The decrypted wallet key should match the original plaintext key");

    }
}
