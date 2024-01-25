Feature: Test Creating A Care Reciever Profile

    @demo
    Scenario: Add A New Care Reciever

        Given A care manager Logs in to PASS webpage
        When The care manager navigates to the Residents page and click Add to add new resident
        And Complete the New resident details sections
        And Makes the new resident active
# Then The new resident is searchable in the search window
# And The residents details are presented in the details page