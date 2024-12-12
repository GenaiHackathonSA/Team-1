package com.fullStack.expenseTracker.services.impls;

import com.fullStack.expenseTracker.exceptions.CategoryNotFoundException;
import com.fullStack.expenseTracker.exceptions.CategoryServiceLogicException;
import com.fullStack.expenseTracker.model.Category;
import com.fullStack.expenseTracker.repository.CategoryRepository;
import com.fullStack.expenseTracker.response.ApiResponseDto;
import com.fullStack.expenseTracker.response.ApiResponseStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ResponseEntity<ApiResponseDto<?>> enableOrDisableCategory(int categoryId) 
            throws CategoryServiceLogicException, CategoryNotFoundException {
        Category category = getCategoryById(categoryId); // Assuming this method exists

        try {
            boolean previousStatus = category.isEnabled();
            category.setEnabled(!previousStatus);
            categoryRepository.save(category);

            String statusMessage = previousStatus 
                ? "Category has been disabled successfully!" 
                : "Category has been enabled successfully!";

            return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponseDto<>(
                    ApiResponseStatus.SUCCESS, 
                    HttpStatus.OK, 
                    statusMessage // Updated message to reflect toggle action
                )
            );
        } catch (Exception e) {
            log.error("Failed to enable/disable category: " + e.getMessage());
            throw new CategoryServiceLogicException("Failed to update category: Try again later!");
        }
    }

    // You may need to implement this method or ensure it exists in your codebase
    private Category getCategoryById(int categoryId) throws CategoryNotFoundException {
        return categoryRepository.findById(categoryId)
            .orElseThrow(() -> new CategoryNotFoundException("Category not found for ID: " + categoryId));
    }
}
