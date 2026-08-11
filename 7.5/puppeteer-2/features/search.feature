Feature: Movie ticket booking

  Scenario: Book one standard seat
    Given user is on cinema page
    When user books one standard seat
    Then user sees booking confirmation

Scenario: Book one vip seat
    Given user is on cinema page
    When user books one vip seat
    Then user sees booking confirmation