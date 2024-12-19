package com.fullStack.expenseTracker.repository;

import com.fullStack.expenseTracker.entities.EncryptedWalletKey;
import com.fullStack.expenseTracker.exceptions.EncryptedKeySaveException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class EncryptedWalletKeyRepositoryTest {

    @Autowired
    private EncryptedWalletKeyRepository encryptedWalletKeyRepository;

    @Test
    @Transactional
    public void testSaveEncryptedKey() {
        // Given
        String walletKey = "test_wallet_key";
        String encryptedData = "encrypted_test_wallet_key"; // This would normally be the output of your encryption function

        EncryptedWalletKey encryptedWalletKey = new EncryptedWalletKey();
        encryptedWalletKey.setOriginalKey(walletKey);
        encryptedWalletKey.setEncryptedKey(encryptedData);
        
        // When
        EncryptedWalletKey savedKey = encryptedWalletKeyRepository.save(encryptedWalletKey);

        // Then
        assertNotNull(savedKey);
        assertEquals(encryptedData, savedKey.getEncryptedKey());
        assertEquals(walletKey, savedKey.getOriginalKey());
    }

    @Test
    public void testSaveEncryptedKey_NullField() {
        // Given
        EncryptedWalletKey encryptedWalletKey = new EncryptedWalletKey();
        encryptedWalletKey.setEncryptedKey(null); // Intentionally setting a null to check validation

        // When & Then
        assertThrows(DataIntegrityViolationException.class, () -> {
            encryptedWalletKeyRepository.save(encryptedWalletKey);
        });
    }

    @Test
    public void testSaveEncryptedKey_EmptyField() {
        // Given
        String emptyKey = "";
        String encryptedData = "encrypted_empty_wallet_key"; 
        
        EncryptedWalletKey encryptedWalletKey = new EncryptedWalletKey();
        encryptedWalletKey.setOriginalKey(emptyKey);
        encryptedWalletKey.setEncryptedKey(encryptedData); 
        
        // When & Then
        assertThrows(EncryptedKeySaveException.class, () -> {
            encryptedWalletKeyRepository.save(encryptedWalletKey);
        });
    }
}
