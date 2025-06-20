// Components
import { FormEventHandler } from 'react';
import { LoaderCircle } from 'lucide-react';
import { Head, useForm } from '@inertiajs/react';

import TextLink from '@/components/text-link';
import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthLayout title="Vérification de l'email" description="Veuillez vérifier votre adresse email en cliquant sur le lien que nous venons de vous envoyer.">
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    Un nouveau lien de v&eacute;rification a &eacute;t&eacute; envoy&eacute; &agrave; l'adresse email que vous nous avez fournie lors de l'inscription.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button className={'bg-main hover:bg-hover text-black'} disabled={processing} variant="secondary">
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Renvoyer l'email de v&eacute;rification
                </Button>

                <TextLink href={route('logout')} method="post" className="mx-auto block text-sm">
                    D&eacute;connexion
                </TextLink>
            </form>
        </AuthLayout>
    );
}
