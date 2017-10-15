// A few items of javascript required to validate and whatnot 


function userInputValidation(){
    
    var 
    sFirstName = window.document.userFeedbackForm.firstname.value,                  // Grab some data from the form
    sSurname = window.document.userFeedbackForm.surname.value,                      // that we intend on checking for
    sEmail = window.document.userFeedbackForm.email.value,                          // validity, my one concern is that
    sAddress = window.document.userFeedbackForm.address.value,                      // anyone who blocks javascript
                                                                                    // or doesn't whitelist this javascript
    bNewsletterYes = document.getElementById("NewsletterYes").checked,              // will never have their data validated
    bNewsletterNo = document.getElementById("NewsletterNo").checked,                // and could potentially send invalid data
                                                                                    // or worse, perform a number of RCEs.
    sAgeRange = window.document.userFeedbackForm.AgeRange.value,                    // For now, we shall assume that any end user
                                                                                    // will not be a nasty person in this respect
    bSubmisionQuery = document.getElementById("submisionQuery").checked,           // and generally will adhere to not doing 
    bFeedbackQuery = document.getElementById("submisionFeedback").checked,         // rather flavourful things to us.
    bOtherQuery = document.getElementById("submisionOther").checked,              

    sUserInputLargeText = window.document.userFeedbackForm.userinputtext.value;

    validName = nameValidation(sFirstName, sSurname, sAddress);                                     // First of the validation checks

    validEmail = validateEmail(sEmail);                                                             // Email validation
    
    validNewsletterChoice = validateNewsletterChoice(bNewsletterYes,bNewsletterNo);                 // Validate a choice for newsletter

    validSubmisionChoice = validateSubmissionChoice(bSubmisionQuery,bFeedbackQuery,bOtherQuery);   // Validate submision option has been chosen

    validTextInput = validLargeUserInput(sUserInputLargeText);                                      // Validate length of submision

    if(validName && validEmail && validNewsletterChoice && validSubmisionChoice && validTextInput){                  // If they're all true, we can say the form is valid :)
        return true;
    }
    else{
        return false;                                                                               // Else don't submit data
    }
}

function nameValidation(name, surname, address){    // Validation of Firstname, Surname, does not expect anything but to strip whitespaces before and after name
                                                    // Also assumes names could include UTF-16 OR 32 Chars that could be from foreign langages.
    var 
    isValidName = true,
    isValidSurnname = true,
    isValidAddress = true,
    nameLength = name.length,
    surnameLength = surname.length,
    addressLength = address.length;

    // Below line of code is used to strip spaces before a name, after a name and otherwise assume it is valid.
    // One of the largest issues here would be that we cannot account for all obscure or niche names we potentially
    // Will encounter, I searched for an all encompassing solution to this, however we cannot tell people that names such as
    // Sørensen, Юдович or 李 are invalid. as suggested on: https://stackoverflow.com/questions/9445334/javascript-regex-valid-name

    // My reasoning for not validation more than nulls and "" for address also stem from a similar issue.
    // As it would be far to complex to consider all the potential address styles or entries from around the world
    // Let alone, just Australia.
    // Reasoning supported by discussion here: https://stackoverflow.com/questions/9397485/regex-street-address-match

    name = name.replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/, " ");
    surname = surname.replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/, " ");
    address = address.replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/, " ");

    switch(name){                       // Some light switching based on modified string
        case "":
            isValidName = false;        // Blank, no good. You lose.
            errorsBeHere(0);
        case null:
            isValidName = false;        // Can a user pass a null? Even if they can't we never want that.
            errorsBeHere(0);
    }

    switch(surname){                    // As above
        case "":
            isValidSurnname = false;    // Blank no good. Like dividing by 0.
            errorsBeHere(1);
        case null:
            isValidSurnname = false;    // Null likely even worse.
            errorsBeHere(1);
    }

    switch(address){                    // As above
        case "":
            isValidSurnname = false;    // Blank no good. Like dividing by 0.
            errorsBeHere(2);
        case null:
            isValidSurnname = false;    // Null likely even worse.
            errorsBeHere(2);
    }

    if(isValidName == true && isValidSurnname == true && isValidAddress == true){       // Are both names and the address valid?
        if(nameLength < 50 && surnameLength < 50 && addressLength < 100){               // Let's also check they ain't trying a silly long name
            return true;                                                                // Failing a script or 50 char+ name, valid :)
        }
        else{
            if(nameLength > 50){
                errorsBeHere(0);
            }
            if(surnameLength > 50){
                errorsBeHere(1);
            }
            if(addressLength > 100){
                errorsBeHere(2);
            }
            alert("Heya!\nLooks like your name or address may be invalid.\nValid names and surnames will include 50 characters, addresses 100\nPlease try again");
            return false;
        }
    }
    else{
        alert("Heya!\nLooks like your name or address may be invalid.\nValid names and surnames will include 50 characters, addresses 100\nPlease try again"); 
        return false;
    }
}
    // Below validation is credit to https://stackoverflow.com/questions/46155/how-to-validate-email-address-in-javascript#46181
    // This was used as test data could not be assigned, and using this method should ensure most emails will not
    // Cause a return of "invalid" unless they're missing both a "@" and some kind of domain

function validateEmail(email) {

    var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!regexEmail.test(email)){
        errorsBeHere(3);
        alert("Heya!\nYou seem to have forgotten to have entered a valid email\nPlease check your entry and try again.")
    }

    return regexEmail.test(email);
}

function validateNewsletterChoice(YesChecked,NoChecked){    // Check if the user wants to receive a newsletter
                                                            // Only invalid option is if both yes and no are chosen
    if(YesChecked){                                         // This could also be done on a radio button to avoid this
        if(NoChecked){                                      // However it serves a good purpose to highlight use of check-boxes.
            return false;                                   // <-- Both checked here, invalid
        }
        else{
            return true;                                    // Yes checked, No unchecked here - valid
        }
    }
    else if(NoChecked){                                     // Just No is checked, valid entry
        return true;
    }
    else{
        alert("Heya!\nLooks like you're not a fan of newsletters\nThat's a-okay with us, we'll assume you don't want to receive it");
        return true;                                        // Neither are checked, but we can assume they don't want the newsletter
    }

}

function validateSubmissionChoice(Submission,Feedback,Other){               // Here we can assume that if we get a true value at all that the user
                                                                            // has selected an option and due to grouping of radio-buttons it should be valid
    var isValid = true;                                                     // Hence all we need to check for is if all buttons are false.
                                                                            // If they are we warn them and let them go no further.
    if(!Submission && !Feedback && !Other){                                 // This saves a very messy nested if/else setup.
        isValid = false;
        alert("You may have forgotten to choose a submission type\nPlease check your selection.")
    }

    return isValid; 
}

function validLargeUserInput(Input){

    var InputLength = Input.length;

    if(InputLength > 1000){
        alert("You may have attempted to enter more than 1,000 characters in your submission\nPlease check your submission and try again.")
        return false;
    }
    else{
        return true;
    }

}

function errorsBeHere(number){                                                          // Spitting red backgrounds to highlight issues in the form was getting
                                                                                        // messy looking so instead a small function is called to do it depending 
    switch(number){                                                                     // on what section we want to colour differently
        case 0:
            window.document.userFeedbackForm.firstname.style.backgroundColor = "red";
            break;
        case 1:
            window.document.userFeedbackForm.surname.style.backgroundColor = "red"; 
            break;
        case 2:
            window.document.userFeedbackForm.address.style.backgroundColor = "red";
            break;
        case 3:
            window.document.userFeedbackForm.email.style.backgroundColor = "red";
            break;
    }
}