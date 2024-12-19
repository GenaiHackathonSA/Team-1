package com.fullStack.expenseTracker.services;

import com.fullStack.expenseTracker.encryption.WalletKeyEncryptionService;
import com.fullStack.expenseTracker.repository.EncryptedWalletKeyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WalletKeyService {

    private final WalletKeyEncryptionService walletKeyEncryptionService;
    private final EncryptedWalletKeyRepository encryptedWalletKeyRepository;

    @Autowired
    public WalletKeyService(WalletKeyEncryptionService walletKeyEncryptionService, 
                            EncryptedWalletKeyRepository encryptedWalletKeyRepository) {
        this.walletKeyEncryptionService = walletKeyEncryptionService;
        this.encryptedWalletKeyRepository = encryptedWalletKeyRepository;
    }

    /**
     * This function manages the workflow of encrypting the wallet key using
     * WalletKeyEncryptionService.encryptWalletKey before saving it through
     * EncryptedWalletKeyRepository.saveEncryptedKey. It ensures that keys 
     * are properly handled and stored securely.
     *
     * @param walletKey The plaintext wallet key to be stored securely.
     * @return The ID of the saved encrypted wallet key.
     * @throws Exception If an error occurs during the storing process.
     */
    @Transactional
    public Long storeWalletKey(String walletKey) throws Exception {
        // Validate input
        if (walletKey == null || walletKey.trim().isEmpty()) {
            throw new IllegalArgumentException("Wallet key cannot be null or empty");
        }

        try {
            // Encrypt the wallet key
            String encryptedKey = walletKeyEncryptionService.encryptWalletKey(walletKey);
            
            // Save the encrypted key using the repository
            return encryptedWalletKeyRepository.saveEncryptedKey(encryptedKey);
        } catch (Exception e) {
            // Log the error
            throw new Exception("Error occurred while storing the wallet key: " + e.getMessage(), e);
        }
    }
}
