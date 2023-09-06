const showErrors = data => {

    const { errors } = data

    if (errors && Object.keys(errors).length > 0) {

        for (let key in errors) {

            let input = key
            if (key == 'email') input = 'username'
            if (key == 'start_date') input = 's'
            if (key == 'end_date') input = 't'

            let element = document.getElementsByName(input)[0] || document.getElementsByName(key)[0]
            if (!element) {
                element = document.getElementById(input) || document.getElementById(key)
            }
            
            if (!element) continue

            if (element.getAttribute('type') == 'hidden' || element.classList.contains('hidden') || element.classList.contains('d-none')) {
                element = element.closest('.form-control')
            }

            element.classList.add('is-invalid')
            
            const invalidFeedback = document.createElement('div')
            invalidFeedback.classList.add('invalid-feedback')
            invalidFeedback.innerHTML = errors[key]
            const formGroup = element.closest('.form-group') || element.closest('.form-floating')

            formGroup.classList.add('has-error')
            formGroup.append(invalidFeedback)

            element.addEventListener('focus', function () {
                element.classList.remove('is-invalid')
                invalidFeedback.remove()
            })

            element.addEventListener('click', function () {
                element.classList.remove('is-invalid')
                invalidFeedback.remove()
            })

        }
    }
}

const clearErrors = () => {
    document.querySelectorAll('.is-invalid').forEach(element => {
        element.classList.remove('is-invalid');
        const el = element.closest('.form-group') || element.closest('.form-floating');
        el.classList.remove('has-error');
        const invalidFeedback = el.querySelector('.invalid-feedback');
        if (invalidFeedback) {
            invalidFeedback.remove();
        }
    });

}

export { showErrors, clearErrors }