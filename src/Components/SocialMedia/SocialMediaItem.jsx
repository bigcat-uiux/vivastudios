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
            <Link
                className="vs--icons-items"
                to={data.acfOptionsSocialMedia.socialMediaSettings.socmedFb}
            >
                <span className="socmed-fb"></span>
            </Link>

            <Link
                className="vs--icons-items"
                to={data.acfOptionsSocialMedia.socialMediaSettings.socmedIg}
            >
                <span className="socmed-ig"></span>
            </Link>

            <Link
                className="vs--icons-items"
                to={data.acfOptionsSocialMedia.socialMediaSettings.socmedTwit}
            >
                <span className="socmed-twit"></span>
            </Link>
        </div>
    )
}