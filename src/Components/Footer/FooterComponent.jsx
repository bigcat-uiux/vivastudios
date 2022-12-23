import React from "react";
import { SocialMediaItem } from "../SocialMedia/SocialMediaItem";

const FooterComponent = () => {
    return (
        <div className="inner">
            <div className="flex footer-socket">
                <div className="w12 w-md-6">
                    <div className="vs--footer-group flex">
                        <div className="vs--footer-item w12 w-md-4">
                            <span className="txt bold txt-upper">LEARN MORE</span>
                            <ul className="widget">
                                <li>About VIVA</li>
                                <li>Developers Docs</li>
                                <li>Download</li>
                                <li>Documentation</li>
                            </ul>
                        </div>
                        <div className="vs--footer-item w12 w-md-4">
                            <span className="txt bold txt-upper">CONNECT</span>
                            <ul className="widget">
                                <li>FAQs</li>
                                <li>Support</li>
                                <li>News</li>
                                <li>Twitter</li>
                                <li>Instagram</li>
                            </ul>
                        </div>
                        <div className="vs--footer-item w12 w-md-4">
                            <span className="txt bold txt-upper">LEGAL</span>
                            <ul className="widget">
                                <li>Privacy Policy</li>
                                <li>Term of Use</li>
                                <li>Contributor License Agreement</li>
                                <li>Site Map</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w12 w-md-6">
                    <div className="widget">
                        <div className="socmed-wrap">
                            <span className="txt bold">Find us here: </span>
                            <SocialMediaItem />
                        </div>
                        <div className="widget-content">
                            <p className="txt">Terms and Conditions apply. Please refer to the promotions page for more details.</p>
                            <p className="txt">viva.com uses certain browser cookies to ensure you receive the best gaming experience. By accessing and continuing to use the site you accept the use of these cookies. For information on our use of cookies and how to prevent them please refer to viva´s	terms of use</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterComponent;