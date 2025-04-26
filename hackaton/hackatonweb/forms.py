from django import forms
from django.contrib.auth import get_user_model


class LoginUserForm(forms.ModelForm):
    email = forms.EmailField(label="Электронная почта или логин", widget=forms.EmailInput())
    password = forms.CharField(label="Пароль", widget=forms.PasswordInput())

    def __init__(self, *args, **kwargs):
        super(LoginUserForm, self).__init__(*args, **kwargs)
        for field in self.fields.values():
            field.required = False

    class Meta:
        model = get_user_model()
        fields = ['email', 'password']


class RegisterUserForm(forms.ModelForm):
    username = forms.CharField(label="Логин")
    email = forms.EmailField(label="Электронная почта или логин", widget=forms.EmailInput())
    password = forms.CharField(label="Пароль", widget=forms.PasswordInput())
    password2 = forms.CharField(label="Повтор пароля", widget=forms.PasswordInput())

    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password2']

    def clean_password2(self):
        cd = self.cleaned_data
        if cd['password'] != cd['password2']:
            raise forms.ValidationError("Пароли не совпадают!")
        else:
            return cd['password']

    def clean_email(self):
        email = self.cleaned_data['email']
        if get_user_model().filter(email=email).exists():
            raise forms.ValidationError("Такая электронна почта уже зарегистрирована!")
        return email