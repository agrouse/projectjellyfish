(function() {
  'use strict';

  angular.module('app.components')
    .config(userForm);

  /** @ngInject */
  function userForm(FormsProvider) {
    FormsProvider.register('userForm', {
      fields: [
        {
          className: 'forms__body',
          fieldGroup: [
            {
              key: 'first_name',
              type: 'text',
              templateOptions: {
                label: 'First Name',
                required: true,
                placeholder: 'Enter a first name.'
              },
              validation: {
                messages: {
                  required: '"A first name must be provided"'
                }
              }
            },
            {
              key: 'last_name',
              type: 'text',
              templateOptions: {
                label: 'Last Name',
                required: true,
                placeholder: 'Enter a last name.'
              },
              validation: {
                messages: {
                  required: '"A last name must be provided"'
                }
              }
            },
            {
              key: 'email',
              type: 'text',
              templateOptions: {
                label: 'Email',
                required: true,
                placeholder: 'Enter a valid email address.'
              },
              validation: {
                messages: {
                  required: '"A email address must be provided"'
                }
              }
            },
            {
              key: 'phone',
              type: 'text',
              templateOptions: {
                label: 'Phone Number',
                required: true,
                placeholder: 'Enter a valid phone number.'
              },
              validation: {
                messages: {
                  required: '"A phone number must be provided"'
                }
              }
            },
            {
              key: 'password',
              type: 'password',
              templateOptions: {
                label: 'Password',
                required: false,
                placeholder: 'Enter a password.'
              },
              validation: {
                messages: {
                  required: '"A password must be provided"'
                }
              }
            },
            {
              key: 'password_confirmation',
              type: 'password',
              templateOptions: {
                label: 'Confirm Password',
                required: false,
                placeholder: 'Confirm the password.'
              },
              validation: {
                messages: {
                  required: '"A password confirmation must be provided"'
                }
              }
            },
            {
              key: 'role',
              type: 'select',
              templateOptions: {
                label: 'Role',
                options: [
                  {label: 'User', value: 'user'},
                  {label: 'Manager', value: 'manager'},
                  {label: 'Admin', value: 'admin'},
                ],
              }
            }
          ]
        }
      ]
    });
  }
})();
