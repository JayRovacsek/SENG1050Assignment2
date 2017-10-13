// A few items of javascript required to validate and whatnot 


function userInputValidation(){
    
    var 
    sFirstName = window.document.userFeedbackForm.firstname.value,
    sSurname = window.document.userFeedbackForm.surname,
    sEmail = window.document.userFeedbackForm.email,
    sAddress = window.document.userFeedbackForm.address,

    bNewsletterYes = document.getElementById("NewsletterYes").checked,
    bNewsletterNo = document.getElementById("NewsletterNo").checked,

    sAgeRange = window.document.userFeedbackForm.AgeRange,

    bSubmisionQuery = document.getElementById("submissionQuery").checked,
    bFeedbackQuery = document.getElementById("submissionFeedback").checked,
    bOtherQuery = document.getElementById("submissionOther").checked,

    valid = nameValidation(sFirstName, sSurname);

    alert(sFirstName);
    return valid;
}

function nameValidation(name, surname){

    if(name == null){
        return false;
    }

    if(surname == null){
        return false;
    }

    if(name == ""){
        return false;
    }

    if(surname == ""){
        return false;
    }

    return true;

}


/*function calculator() 
{
    var x = window.document.the_form.field_one.value;
    var y = window.document.the_form.field_two.value;
    var p = x * y;
    alert(x + " times " + y + " is " + p);
} calculator() */