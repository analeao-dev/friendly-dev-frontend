import { Form } from "react-router";
import type { Route } from "./+types";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    const data = {
        name, email, subject, message
    }

    return { message: 'Mensagem enviada com sucesso!', data }

}

const ContactPage = ({ actionData }: Route.ComponentProps) => {
    return (
        <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900">
            <h2 className="text-3xl font-bold text-white mb-8">📫 Entre em Contato</h2>

            {actionData?.message ? (<p className="mb-6 bg-green-700 p-2 text-green-100 text-center rounded-lg border border-green-500 shadow-md">{actionData.message}</p>) : null}

            <Form method="post" className='space-y-6'>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nome completo</label>
                    <input type="text" id="name" name="name" className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                    <input type="email" id="email" name="email" className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" />
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Assunto</label>
                    <input type="text" id="subject" name="subject" className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">Mensagem</label>
                    <textarea id="message" name="message" className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"></textarea>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">Enviar</button>
            </Form>
        </div>
    )
}

export default ContactPage;