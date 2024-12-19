package com.fullStack.expenseTracker.repository;

import com.fullStack.expenseTracker.entities.EncryptedWalletKey;
import com.fullStack.expenseTracker.entities.Transaction;
import com.fullStack.expenseTracker.exceptions.DatabaseOperationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
public class EncryptedWalletKeyRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private TransactionRepository transactionRepository;

    /**
     * Saves the encrypted wallet key into the database.
     * This function leverages the existing `TransactionRepository` to link the wallet key
     * with transactions if necessary.
     * 
     * @param encryptedWalletKey The encrypted wallet key to save.
     * @throws DatabaseOperationException if the operation fails.
     */
    @Transactional
    public void saveEncryptedKey(EncryptedWalletKey encryptedWalletKey) throws DatabaseOperationException {
        try {
            entityManager.persist(encryptedWalletKey);

            // If there are any related transactions, we can link them here
            if (encryptedWalletKey.getTransactionId() != null) {
                Transaction transaction = transactionRepository.findById(encryptedWalletKey.getTransactionId())
                        .orElse(null);
                
                if (transaction != null) {
                    // You may establish some form of relationship here if necessary
                }
            }
        } catch (Exception e) {
            throw new DatabaseOperationException("Failed to save encrypted wallet key. Reason: " + e.getMessage(), e);
        }
    }
}
