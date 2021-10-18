sendForm = () => {

}

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

var $select1 = $( '#dependencia' ),
$select2 = $( '#oficina' ),
$options = $select2.find( 'option' );

$select1.on( 'change', function() {
$select2.html( $options.filter( '[value="' + this.value + '"]' ) );
} ).trigger( 'change' );
  