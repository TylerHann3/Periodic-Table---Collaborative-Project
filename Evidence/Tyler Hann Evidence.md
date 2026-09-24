### Activity 5: Individual Feature Design — Interactive Periodic Table Modal
# Interface Specifications

What it receives: An element symbol (e.g., 'H', 'He') in the form of a string passed via the HTML button's click event.

What it produces: Injected text into DOM modal elements (such as element name, atomic number, mass, and properties) along with dynamically generated choice buttons for the mini-quiz, and changes the modal CSS display style to visible (flex).

What it assumes: It assumes that a complete elementsData object dictionary exists and is loaded, and that every symbol passed into the function has a matching key containing all required data attributes.

### Algorithm Design (Pseudocode)

This design shows explicit sequence, selection, and iteration:

FUNCTION OpenElementModelc(symbol)
    // 1. SEQUENCE & SELECTION: Look up element data and check if it exists
    SET data TO elementsData[symbol]
    
    IF data IS NOT NULL THEN
        // SEQUENCE: Update text fields sequentially in the DOM modal
        SET DOM element 'modal-symbol' text TO symbol
        SET DOM element 'modal-name' text TO data.name
        SET DOM element 'modal-atomic-num' text TO data.num
        SET DOM element 'modal-mass' text TO data.mass
        SET DOM element 'modal-protons' text TO data.protons
        SET DOM element 'modal-melt' text TO data.melt
        SET DOM element 'modal-boil' text TO data.boil
        SET DOM element 'modal-use' text TO data.use
        SET DOM element 'modal-category' text TO data.category
        SET DOM element 'modal-question' text TO data.q

        // 2. ITERATION: Loop through the options array to generate quiz buttons
        CLEAR container 'interactive-options'
        FOR EACH option IN data.options
            CREATE a new button element
            SET button text TO option
            ATTACH click event calling checkAnswer(option, data.correct)
            APPEND button to container 'interactive-options'
        END FOR

        // SEQUENCE: Make the modal visible to the user
        SET style of 'element-modal' display TO 'flex'
    ELSE
        RETURN // Exit early if the element data doesn't exist
    END IF
END FUNCTION

### Abstraction Decision:

I put the DOM element lookups, data injection, and dynamic option-button generation 
into the OpenElementModelc(symbol) function so that the rest of the program only needs 
to trigger the function with a target element symbol, without needing to know how the 
modal fields or options are populated behind the scenes.