# SauceDemo Test Automation Framework

A comprehensive end-to-end test automation framework built with **Cypress** and **Cucumber BDD** for testing the SauceDemo e-commerce application.

## 🚀 Framework Overview

This framework implements behavior-driven development (BDD) using Gherkin syntax to create readable, maintainable, and comprehensive test scenarios for the SauceDemo website (https://www.saucedemo.com).

### Key Features
- ✅ **BDD/Cucumber Integration** - Human-readable test scenarios using Gherkin syntax
- ✅ **Page Object Model** - Organized and maintainable page interactions
- ✅ **Scenario Outlines** - Data-driven testing with examples tables
- ✅ **Comprehensive Coverage** - Login, inventory, cart, and checkout functionality
- ✅ **HTML/JSON Reporting** - Detailed test execution reports
- ✅ **Utility Functions** - Reusable helper functions for common operations
- ✅ **Cross-User Testing** - Multiple user personas and authentication scenarios

## 📁 Project Structure

```
├── cypress/
│   ├── e2e/
│   │   ├── cart/
│   │   │   └── cart.js           # Cart and checkout step definitions
│   │   ├── inventory/
│   │   │   └── inventory.js      # Product inventory step definitions
│   │   ├── login/
│   │   │   └── login.js          # Authentication step definitions
│   │   ├── cart.feature          # Cart and checkout test scenarios
│   │   ├── inventory.feature     # Product management test scenarios
│   │   └── login.feature         # Login and authentication test scenarios
│   ├── pages/
│   │   ├── cartPage.js          # Cart and checkout page objects
│   │   ├── inventoryPage.js     # Product inventory page objects
│   │   └── loginPage.js         # Login page objects
│   ├── reports/                 # Generated test reports (HTML/JSON)
│   └── support/
│       ├── commands.js          # Custom Cypress commands
│       ├── e2e.js              # Global test configuration
│       └── utils.js            # Shared utility functions
├── cypress.config.js           # Main Cypress configuration
├── package.json               # Dependencies and scripts
└── README.md                 # This documentation
```

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Cypress** | ^14.5.2 | End-to-end testing framework |
| **@badeball/cypress-cucumber-preprocessor** | ^22.0.1 | BDD/Cucumber integration |
| **@bahmutov/cypress-esbuild-preprocessor** | ^2.2.4 | Module bundling and preprocessing |
| **cypress-mochawesome-reporter** | ^4.0.0 | Enhanced reporting capabilities |

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- Modern web browser (Chrome recommended)

## 🚀 Installation & Setup

1. **Clone/Download the project**
   ```bash
   git clone <repository-url>
   cd techAssignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npx cypress verify
   ```

## 🎯 Test Execution

### Run All Tests (Headless)
```bash
npx cypress run
```

### Run Specific Feature
```bash
npx cypress run --spec "cypress/e2e/login.feature"
npx cypress run --spec "cypress/e2e/inventory.feature"
npx cypress run --spec "cypress/e2e/cart.feature"
```

### Run Tests in Browser (Interactive)
```bash
npx cypress open
```

### Run with Specific Browser
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

## 📊 Test Coverage

### Login & Authentication (login.feature)
- ✅ Successful login with multiple user types
- ✅ Invalid credential validation
- ✅ Empty field validation
- ✅ Locked user handling
- ✅ Logout functionality

### Product Inventory (inventory.feature)
- ✅ Product sorting (price, name, A-Z, Z-A)
- ✅ Product filtering and search
- ✅ Add/remove products to cart
- ✅ Cart badge updates
- ✅ Product details verification

### Cart & Checkout (cart.feature)
- ✅ Complete checkout process
- ✅ Form validation (missing required fields)
- ✅ Product quantity management
- ✅ Security testing (unauthorized access)
- ✅ Order confirmation verification

### Test Users
| Username | Password | Purpose |
|----------|----------|---------|
| `standard_user` | `secret_sauce` | Standard functionality testing |
| `performance_glitch_user` | `secret_sauce` | Performance testing |
| `problem_user` | `secret_sauce` | UI issue testing |
| `error_user` | `secret_sauce` | Error handling testing |
| `visual_user` | `secret_sauce` | Visual testing |
| `locked_out_user` | `secret_sauce` | Access restriction testing |

## 📈 Reporting

### Automatic Report Generation
Reports are automatically generated after test execution:

- **HTML Report**: `cypress/reports/cucumber-report.html`
- **JSON Report**: `cypress/reports/cucumber-report.json`

### Viewing Reports
Open the HTML report in your browser for detailed test results:
```bash
# Windows
start cypress/reports/cucumber-report.html

# Mac/Linux
open cypress/reports/cucumber-report.html
```

## 🏗️ Framework Architecture

### Page Object Model
Each page has a dedicated class containing:
- Element selectors
- Page-specific actions
- Navigation methods

### Step Definitions
Organized by feature area:
- **Given**: Setup and preconditions
- **When**: User actions and interactions
- **Then**: Assertions and validations

### Utility Functions
Shared functions for common operations:
- `addProductsToCart()` - Add multiple products
- `removeProductsFromCart()` - Remove products
- `checkCartBadge()` - Verify cart count
- `waitForPageReady()` - Page load synchronization

## 🔧 Configuration

### Cypress Configuration (cypress.config.js)
- Cucumber preprocessor setup
- esbuild integration
- Base URL configuration
- Viewport and timeout settings

### Cucumber Configuration (package.json)
- Step definitions pattern
- Report output locations
- HTML/JSON report settings

## 🐛 Troubleshooting

### Common Issues

**1. Tests failing due to timing**
- Solution: Increase timeouts in cypress.config.js
- Use `cy.wait()` for specific elements

**2. Step definitions not found**
- Solution: Check stepDefinitions pattern in package.json
- Verify file paths and imports

**3. Browser compatibility issues**
- Solution: Test with different browsers
- Update browser-specific configurations

### Debug Mode
Run tests with debug output:
```bash
DEBUG=cypress:* npx cypress run
```

## 📝 Writing New Tests

### 1. Add Feature File
Create `.feature` file in `cypress/e2e/`:
```gherkin
Feature: New functionality
  Scenario: Test scenario
    Given I am on the application
    When I perform an action
    Then I should see expected result
```

### 2. Implement Step Definitions
Create corresponding `.js` file with step implementations.

### 3. Update Page Objects
Add new elements and methods to appropriate page objects.

### 4. Run and Validate
Execute tests and verify functionality.

## 🤝 Contributing

1. Follow existing code structure and naming conventions
2. Add appropriate comments and documentation
3. Ensure all tests pass before committing
4. Update README for new features or changes

## 📞 Support

For issues or questions:
1. Check existing documentation
2. Review Cypress and Cucumber documentation
3. Verify browser and dependency versions
4. Check console logs for detailed error messages

---

**Framework Version**: 1.0.0  
**Last Updated**: July 2025  
**Maintainer**: QE Team