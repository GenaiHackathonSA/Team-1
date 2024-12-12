package com.fullStack.expenseTracker.controllers;

import com.fullStack.expenseTracker.dto.ApiResponseDto;
import com.fullStack.expenseTracker.services.CategoryService;
import com.fullStack.expenseTracker.exception.CategoryServiceLogicException;
import com.fullStack.expenseTracker.exception.CategoryNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/spendwise/category")
public class CategoryController {

    private final CategoryService categoryService;

    // Constructor for dependency injection
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @DeleteMapping("/delete")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDto<?>> toggleCategoryStatus(@RequestParam("categoryId") int categoryId)
            throws CategoryServiceLogicException, CategoryNotFoundException {
        return categoryService.enableOrDisableCategory(categoryId);
    }
}
