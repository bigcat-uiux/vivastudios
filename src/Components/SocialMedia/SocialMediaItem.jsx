import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_SOCMED_DATA = gql`
    query SocMed {
        acfOptionsSocialMedia {
            socialMediaSettings {
                socmedFb
                socmedIg
                socmedTwit
            }
        }
    }
`;

export const SocialMediaItem = () => {
    const {loading, error, data} = useQuery(GET_SOCMED_DATA);

    if (loading) return 'Loading...';
    if (error) return `Error :(`;

    return(
        <div className="vs-icons-group socmed">

            <a
                className="vs--icons-items"
                href={data.acfOptionsSocialMedia.socialMediaSettings.socmedTwit}
                rel="noreferrer"
                target="_blank"
                aria-label='Twitter'
            >
                <span className="socmed-twit"></span>
            </a>
            <a
                className="vs--icons-items"
                href={data.acfOptionsSocialMedia.socialMediaSettings.socmedFb}
                rel="noreferrer"
                target="_blank"
                aria-label='Facebook'
            >
                <span className="socmed-fb"></span>
            </a>
            <a
                className="vs--icons-items"
                href={data.acfOptionsSocialMedia.socialMediaSettings.socmedIg}
                rel="noreferrer"
                target="_blank"
                aria-label='Instagram'
            >
                <span className="socmed-ig"></span>
            </a>
        </div>
    )
}