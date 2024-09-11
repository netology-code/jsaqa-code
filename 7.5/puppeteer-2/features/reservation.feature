Feature: ticket booking
    Scenario: Book a standard place
        Given by the user on the page "https://qamid.tmweb.ru/client/index.php"
        When the user selects the furthest available day
        When the user selects a movie '[data-seance-start="1020"]'
        When the user chooses a standard available seat
        When the user confirms the choice
        Then the user should see the movie title "Унесенные ветром."
        Then the ticket cost should be "150"

    Scenario: Book a VIP place
        Given by the user on the page "https://qamid.tmweb.ru/client/index.php"
        When the user selects the following day
        When the user selects a movie '[data-seance-start="1080"]'
        When the user chooses a VIP available seat
        When the user confirms the choice
        Then the user should see the movie title "Микки маус"
        Then the ticket cost should be "1000"



    Scenario: Book a reserved seat
        Given by the user on the page "https://qamid.tmweb.ru/client/index.php"
        When the user selects the following day
        When the user selects a movie '[data-seance-start="720"]'
        When the user chooses a reserved seat
        Then the confirmation button should be disabled

