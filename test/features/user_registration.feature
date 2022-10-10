Feature: User registration

Scenario: U1.1 Rider successful registration
    Given I am not registered
    When I register as a rider with email "mateo@mateo.com" and wallet "wallet123"
    Then A rider with email "mateo@mateo.com" and wallet "wallet123" is created
