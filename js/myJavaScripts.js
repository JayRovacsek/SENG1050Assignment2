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
    bSubmisionQuery = document.getElementById("submissionQuery").checked,           // and generally will adhere to not doing 
    bFeedbackQuery = document.getElementById("submissionFeedback").checked,         // rather flavourful things to us.
    bOtherQuery = document.getElementById("submissionOther").checked,              

    sUserInputLargeText = window.document.userFeedbackForm.userinputtext.value;

    valid = nameValidation(sFirstName, sSurname, sAddress);                         // First of the validation checks, if passed,
    if(valid){                                                                      // it should move to the next set of validation
        valid = validateEmail(sEmail);                                              // for user data.
        if(valid){
            valid = validateNewsletterChoice(bNewsletterYes,bNewsletterNo);
        }
    }

    return valid;
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
    // Sørensen, Юдович or 李 are invalid. as found on: https://stackoverflow.com/questions/9445334/javascript-regex-valid-name

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
        case null:
            isValidName = false;        // Can a user pass a null? Even if they can't we never want that.
    }

    switch(surname){                    // As above
        case "":
            isValidSurnname = false;    // Blank no good. Like dividing by 0.
        case null:
            isValidSurnname = false;    // Null likely even worse.
    }

    switch(address){                    // As above
        case "":
            isValidSurnname = false;    // Blank no good. Like dividing by 0.
        case null:
            isValidSurnname = false;    // Null likely even worse.
    }

    if(isValidName == true && isValidSurnname == true && isValidAddress == true){       // Are both names and the address valid?
        if(nameLength < 50 && surnameLength < 50 && addressLength < 100){               // Let's also check they ain't trying a silly long name
            return true;                                                                // Failing a script or 50 char+ name, valid :)
        }
        else{
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
    // Cause a return of "invalid"

function validateEmail(email) {

    var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regexEmail.test(email);
}

function validateNewsletterChoice(YesChecked,NoChecked){    // Check if the user wants to recieve a newsletter
                                                            // Only invalid option is if both yes and no are chosen
    if(YesChecked){                                         // This could also be done on a radio button to avoid this
        if(NoChecked){                                      // However it serves a good purpose to highlight use of checkboxes.
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
        alert("Heya!\nLooks like you're not a fan of newsletters\nThat's a-okay with us, we'll assume you don't want to recieve it");
        return true;                                        // Neither are checked, but we can assume they don't want the newsletter
    }

}