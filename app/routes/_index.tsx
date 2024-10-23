/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Form, useActionData, useLoaderData
} from "@remix-run/react";


import {ActionFunctionArgs, json, LinksFunction, LoaderFunctionArgs, redirect} from "@remix-run/node";
import {ReactNode, useEffect, useState, lazy, Suspense} from "react";

import imageArrow from '../../images/icon-arrow.svg'

// https://remix.run/resources/remix-utils
import {getClientIPAddress} from "remix-utils/get-client-ip-address";

//MAP
let LazyImported = lazy(() => import("../components/MainNavigation"));

export function ClientOnly({children}: { children: ReactNode }) {
    let [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    return mounted ? <>{children}</> : null;
}


// 93.47.231.225
export async function loader({request}: LoaderFunctionArgs) {
// using the request
    const ipAddress = getClientIPAddress(request) ?? getClientIPAddress(request.headers) ?? '3.11.106.35'

    // const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_N8owOeBcMSoi95ZyenAIerCNzi36E&ipAddress=${ipAddress}`);
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_iiwnG7r9nRGWhqZHL8yJb5JYqJb5O&ipAddress=${ipAddress}`);
    const geoLoc = await response.json();
    const nominatimURL = await fetch('https://nominatim.openstreetmap.org/search?addressDetails=1&q=' + geoLoc.location.city + '&format=json&limit=1');
    const coordinates = await nominatimURL.json();
    return json({
        ip: geoLoc.ip,
        location: geoLoc.location.city + ", " + geoLoc.location.region+ ", " + geoLoc.location.country,
        timezone: geoLoc.location.timezone,
        isp: geoLoc.isp,
        lat: coordinates[0].lat,
        lon: coordinates[0].lon
    });
}


export async function action({request}: ActionFunctionArgs) {

    const formData = await request.formData();
    const IPData = Object.fromEntries(formData);
    if (IPData.address.length < 8 || !(/^\d+(\.\d+)+$/.test(IPData.address))) {
        return {message: 'Invalid IP v4 ADDRESS - must be at least 5 characters long.'};
    } else {
        // const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_N8owOeBcMSoi95ZyenAIerCNzi36E&ipAddress=${IPData.address}`);
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_iiwnG7r9nRGWhqZHL8yJb5JYqJb5O&ipAddress=${IPData.address}`);
        const geoLoc = await response.json();
        const nominatimURL = await fetch('https://nominatim.openstreetmap.org/search?addressDetails=1&q=' + geoLoc.location.city + '&format=json&limit=1');
        const coordinates = await nominatimURL.json();

        return {
            ip: geoLoc.ip,
        location: geoLoc.location.city + ", " + geoLoc.location.region+ ", " + geoLoc.location.country,
            timezone: geoLoc.location.timezone,
            isp: geoLoc.isp,
            lat: coordinates[0].lat,
            lon: coordinates[0].lon

        };

    }
}

export default function Index() {
    const dataPosted = useActionData();
    const dataFetched = useLoaderData();

    const data = dataPosted || dataFetched;

    return (<>
        {data?.message ? <p>{data.message}</p> : <>
            <main className={"content"}>
                <div className={"bgImage"}>
                    <h1>IP Address Tracker</h1>

                    <Form method="post" id="ip-form">
                        <div className="input-container">
                            <input type="text" id="address" name="address" className={"round"}
                                   placeholder={"Search for any IP address or domain"}
                                   required/>
                            <button>
                                <img src={imageArrow} alt={"arrow submit"}/>
                            </button>
                        </div>
                    </Form>
                </div>

                <table>
                    <thead>
                    <tr>
                        <th>IP ADDRESS</th>
                        <th>LOCATION</th>
                        <th>TIMEZONE</th>
                        <th>ISP</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td data-label="IP ADDRESS">{data?.ip || "Loading..."}</td>
                        <td data-label="LOCATION">{data?.location || "Loading..."}</td>
                        <td data-label="TIMEZONE">{"UTC " + (data?.timezone || "Loading...")}</td>
                        <td data-label="ISP">{data?.isp || "Loading..."}</td>
                    </tr>
                    </tbody>
                </table>


                <div className="div map">
                    <ClientOnly>
                        <Suspense fallback="">
                            <LazyImported lat={data?.lat || "Loading..."} lon={data?.lon || "Loading..."}/>
                        </Suspense>
                    </ClientOnly>
                </div>

            </main>
        </>}
    </>);

}