package com.fullStack.expenseTracker.encryption;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.fullStack.expenseTracker.services.WalletKeyService;
import com.fullStack.expenseTracker.repository.EncryptedWalletKeyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class WalletKeyIntegrationsTest {

    @InjectMocks
    private WalletKeyService walletKeyService;

    @Mock
    private EncryptedWalletKeyRepository encryptedWalletKeyRepository;

    private String originalKey;
    private String encryptedKey;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        originalKey = "mySuperSecretWalletKey";
        // Encrypting the original key manually for testing purpose
        SecretKey key = new SecretKeySpec("mySecretKey12345".getBytes(StandardCharsets.UTF_8), "AES");
        encryptedKey = Base64.getEncoder().encodeToString(originalKey.getBytes());
    }

    @Test
    void testDecryptWalletKey() {
        // Mock the behavior of the repository to return the encrypted key
        when(encryptedWalletKeyRepository.findById(anyLong())).thenReturn(Optional.of(encryptedKey));

        // Call the method that should decrypt the wallet key
        String decryptedKey = walletKeyService.decryptWalletKey(encryptedKey);

        // Validating that we correctly retrieve the original wallet key
        assertNotNull(decryptedKey, "The decrypted wallet key should not be null");
        assertEquals(originalKey, decryptedKey, "The decrypted key does not match the original key");
    }
}
