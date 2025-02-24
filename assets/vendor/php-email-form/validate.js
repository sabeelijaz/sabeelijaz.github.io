/**
* PHP Email Form Validation - v3.7
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;
      
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');


      email_form_submit(thisForm);   
         
    });
  });

  function email_form_submit(thisForm) {
    if (thisForm) {
      var mailData = new FormData(thisForm);
      var mailUri = "mailto:sabeelijaz07@gmail.com" + 
      `?subject=${mailData.get('subject')}` +
      `&email=${mailData.get('email')}` +
      `&body=${mailData.get('body')}`;
      
      thisForm.querySelector('.loading').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.add('d-block');
      thisForm.reset();
  
      location.href = mailUri;
    }
    
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
