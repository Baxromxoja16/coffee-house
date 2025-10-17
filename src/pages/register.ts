import InputField from "../components/input-field";
import { ApiErrorResponse, ApiResponse, AuthResponse, AuthSuccessResponse } from "../types/interfaces";

class Register {
    error: string = '';
    responseData: AuthSuccessResponse | {} = {}
    constructor() {
        const submitBtn = document.querySelector('button-secondary');

        submitBtn?.addEventListener('click', () => {
            this.submit()
        })
    }

    async submit() {
        const form = document.querySelector(".form-field")!;
        const inputs = form.querySelectorAll("input-field");

        let data = {};
        inputs.forEach((input) => {
            data = { ...data, ...(input as InputField).value };
        })
        console.log(data);

        try {
            const response = await fetch('http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/auth/register', {
                method: "POST",
                body: JSON.stringify(data),
            });
            
            const responseData: ApiErrorResponse | ApiResponse<AuthSuccessResponse> = await response.json();
            console.log(responseData);
            if(responseData.error) {
                this.error = responseData.error;
                return;
            };

            if(response.status >= 400) this.responseData = responseData;
            console.log(this.responseData);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Register()
});