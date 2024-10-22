/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Form, Links, LiveReload, Meta, Outlet, Scripts,
} from "@remix-run/react";

// import homeStyles from '~/styles/home.css';

import {ActionFunctionArgs, json, LinksFunction, LoaderFunctionArgs, redirect} from "@remix-run/node";

import appStylesHref from "./app.css?url";


export default function App() {


    return (<html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body>

        <Outlet/>

        {/* 🤦🏻 This component renders the client runtime of your app 🤦🏻‍♂️*/}
        <Scripts/>
        </body>
        </html>);
}
export const links: LinksFunction = () => [{
    rel: "stylesheet",
    href: appStylesHref
}, // {rel: "stylesheet", href: homeStyles},
];
