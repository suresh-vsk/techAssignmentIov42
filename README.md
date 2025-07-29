# SauceDemo Test Automation Framework - Technical Assignment Solution

**Quality Automation Engineer Technical Assignment**  
**Project URL**: https://www.saucedemo.com/  
**Objective**: Add additional coverage to a Cypress framework while refactoring broken tests and implementing comprehensive test automation

> **📋 Note**: This branch demonstrates the **UI Testing Strategy**. For alternative approaches, see branches `apistratnew` (API Authentication approach) and `sqlapproach` (SQL approach) and corresponding readme.

## Framework Overview

Comprehensive Cypress + Cucumber BDD framework for SauceDemo testing:
- **Complete UI Testing Coverage** - Full automation of login, inventory, cart, and checkout
- **BDD/Cucumber Integration** - Human-readable test scenarios using Gherkin syntax
- **Page Object Model** - Organized and maintainable page interactions

### Key Features Implemented
- **BDD/Cucumber Integration** - Human-readable test scenarios using Gherkin syntax
- **Page Object Model** - Organized and maintainable page interactions
- **Comprehensive Coverage** - Login, inventory, cart, and checkout functionality
- **Performance Monitoring** - Handles slow-loading users (performance_glitch_user)
- **HTML/JSON Reporting** - Detailed test execution reports
- **Multi-User Testing** - Different user and authentication scenarios

## Project Structure

```
├── cypress/
│   ├── e2e/
│   │   ├── cart/
│   │   │   └── cart.js               # Cart and checkout step definitions
│   │   ├── inventory/
│   │   │   └── inventory.js          # Product inventory step definitions
│   │   ├── login/
│   │   │   └── login.js              # Authentication step definitions
│   │   ├── cart.feature              # Cart and checkout test scenarios
│   │   ├── inventory.feature         # Product management test scenarios
│   │   └── login.feature             # Login and authentication test scenarios
│   ├── pages/
│   │   ├── cartPage.js              # Cart and checkout page objects
│   │   ├── inventoryPage.js         # Product inventory page objects
│   │   └── loginPage.js             # Login page objects
│   ├── reports/                     # Generated test reports (HTML/JSON)
│   └── support/
│       ├── commands.js              # Custom Cypress commands
│       ├── e2e.js                  # Global test configuration
│       └── utils.js                # Shared utility functions
├── cypress.config.js               # Main Cypress configuration
├── package.json                   # Dependencies and scripts
└── README.md                      # This documentation
```

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Cypress** | ^14.5.2 | End-to-end testing framework |
| **@badeball/cypress-cucumber-preprocessor** | ^22.0.1 | BDD/Cucumber integration |
| **@bahmutov/cypress-esbuild-preprocessor** | ^2.2.4 | Module bundling and preprocessing |
| **cypress-mochawesome-reporter** | ^4.0.0 | Enhanced reporting capabilities |

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- Modern web browser (Chrome recommended)

## Installation & Setup

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

## Test Execution

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

## Test Coverage

### Login & Authentication (login.feature)
- Successful login with multiple user types
- Invalid credential validation
- Empty field validation
- Locked user handling
- Logout functionality

### Product Inventory (inventory.feature)
- Product sorting (price, name, A-Z, Z-A)
- Add/remove products to cart
- Cart badge updates

### Cart & Checkout (cart.feature)
- Complete checkout process
- Form validation (missing required fields)
- Security testing (unauthorized access)
- Order confirmation verification

## Reporting

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

## Framework Architecture

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

## Configuration

### Cypress Configuration (cypress.config.js)
- Cucumber preprocessor setup
- esbuild integration
- Base URL configuration
- Viewport and timeout settings

### Cucumber Configuration (package.json)
- Step definitions pattern
- Report output locations
- HTML/JSON report settings

## Handling Negative Tests

### Negative Test Cases
The framework includes comprehensive negative testing scenarios:

**Login Failures:**
- Invalid credentials validation
- Empty field submissions

**Cart Operation Failures:**
- Adding invalid products
- Removing non-existent items
- Session timeout scenarios
- Unauthorized access attempts

**Checkout Process Failures:**
- Missing required information
- Invalid form data
- Session timeout scenarios (unauthorized access)

## API and SQL Testing Implementation Plan

**Show me how you would plan to implement API and SQL testing into the framework**

### **Implemented Alternative approaches**

have implemented two additional testing approaches as separate branches to demonstrate different approaches:

`apistratnew` branch
`sqlapproach` branch

### **Branch Navigation**
```bash
# View API Authentication Strategy
git checkout apistratnew

# View SQL Database Strategy  
git checkout sqlapproach

# Return to UI Strategy
git checkout master
```

## Troubleshooting

### Common Issues

**1. Tests failing due to timing**
- Solution: Increase timeouts in cypress.config.js
- Use `cy.wait()` for specific elements

**2. Element not found errors**
- Solution: Use more specific selectors