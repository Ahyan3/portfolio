jQuery(document).ready(function($) {
  $('.php-email-form').on('submit', function(e) {
    e.preventDefault();
    const form = $(this);
    $.ajax({
      url: form.attr('action'),
      type: 'POST',
      data: form.serialize(),
      success: function(response) {
        form.append('<div class="sent-message">Your message has been sent!</div>');
      },
      error: function(xhr) {
        form.append('<div class="error-message">Error: ' + xhr.status + '</div>');
      }
    });
  });
});