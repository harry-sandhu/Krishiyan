import React from 'react'

function Terms() {
    return (
        <>
            <img src="/Images/logo.png" alt="loading" height={"150px"} width={"150px"} className='m-5' />
            <h3 className='text-2xl underline'>Terms and Conditions for <span className='text-[#3FC041] font-bold'>Krishi</span><span className='text-[#3390FF] font-bold'>Yan</span> App</h3>

            <ol className='text-left m-10'>
                <li className='bg-gray-100 p-5'><strong>Introduction</strong>
                    <p className='indent-9 rounded-lg'>Welcome to the KrishiYan app, a digital platform developed by Wetacre Sustainable Solutions Private Limited ("Company"). By accessing or using our services, you agree to comply with and be bound by the following terms and conditions ("Terms"). Please read them carefully. If you do not agree to these Terms, please do not use our platform.</p>
                </li>

                <li className='bg-gray-100 mt-5 p-5'><strong>Definitions</strong>
                    <ul className='list-disc p-5'>
                        <li>"Platform" refers to the KrishiYan website and mobile application.</li>
                        <li>"FPO" refers to Farmer Producer Organizations using the Platform.</li>
                        <li>"User" refers to anyone who accesses or uses the Platform, including FPO members, farmers, and other stakeholders.</li>
                        <li>"Services" refer to the services provided by the KrishiYan platform, including farmer management, remote crop monitoring, procurement automation, and market linkage.</li>
                    </ul>
                </li>

                <li className='bg-gray-100 mt-5 p-5'><strong>Eligibility</strong>
                    <p>By using the Platform, you affirm that you are at least 18 years of age or are using the Platform under the supervision of a legal guardian. You must have the legal authority to enter into these Terms.</p>
                </li>

                <li className='bg-gray-100 mt-5 p-5'><strong>User Responsibilities</strong>
                    <ul className='list-disc p-5'>
                        <li>You agree to provide accurate, complete, and updated information when registering and using the Platform.</li>
                        <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                        <li>You must not use the Platform for any illegal or unauthorized purposes.</li>
                        <li>You agree to use the Platform in compliance with all applicable local, state, national, and international laws and regulations.</li>
                    </ul>
                </li>

                <li className='bg-gray-100 mt-5 p-5'><strong>Services Provided</strong>
                    <ul className='list-disc p-5'>
                        <li>Farmers Management: A comprehensive tool for FPOs to manage their farmer members, transactions, and communication.</li>
                        <li>Remote Crop Monitoring: Technology for monitoring of crop health and yield.</li>
                        <li>Automated Procurement: A digital procurement system that enables transparent and fair pricing.</li>
                        <li>Market Development: Tools for market research, data analytics, and access to industry buyers.</li>
                        <li>Inventory Management: Real-time tracking for efficient storage and logistics management.</li>
                    </ul>
                </li>

                <li className='bg-gray-100 mt-5 p-5'><strong>Payment and Subscription</strong>
                    <ul className='list-disc p-5'>
                        <li>The Platform operates on an annual subscription basis, with pricing determined based on the number of farmers engaged by the FPO.</li>
                        <li>Payments are non-refundable unless specifically outlined in the refund policy.</li>
                        <li>Failure to make timely payments may result in the suspension or termination of your account.</li>
                    </ul>
                </li>

                <li className='bg-gray-100 mt-5 p-5'><strong>Intellectual Property</strong>
                    <ul className='list-disc p-5'>
                        <li>All content, including text, graphics, logos, and software, is the intellectual property of Wetacre Sustainable Solutions Private Limited.</li>
                        <li>You are granted a limited, non-transferable license to use the Platform for your personal or FPO-related activities. You may not copy, modify, distribute, sell, or lease any part of the Platform without the written consent of Wetacre Sustainable Solutions Private Limited.</li>
                    </ul>
                </li>

                <li className='bg-gray-100 mt-5 p-5'><strong>Data and Privacy</strong>
                    <p>Your use of the Platform is governed by our Privacy Policy, which outlines how we collect, use, and protect your data. By using the Platform, you consent to the collection and use of data in accordance with the Privacy Policy.</p>
                </li>

                <li className='bg-gray-100 mt-5 p-5'><strong>Limitation of Liability</strong>
                    <ul className='list-disc p-5'>
                        <li>Wetacre Sustainable Solutions Private Limited is not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform.</li>
                        <li>The Company is not responsible for any financial losses or disputes between FPOs, farmers, or buyers.</li>
                        <li>The Platform is provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied.</li>
                    </ul>
                </li>

                <li className='bg-gray-100 mt-5 p-5'><strong>Termination</strong>
                    <ul className='list-disc p-5'>
                        <li>Wetacre Sustainable Solutions Private Limited reserves the right to terminate or suspend your account at any time if you violate these Terms.</li>
                        <li>Upon termination, all rights and licenses granted to you will cease, and you must immediately stop using the Platform.</li>
                    </ul>
                </li>

                <li className='bg-gray-100 mt-5 p-5'><strong>Governing Law</strong>
                    <p>These Terms are governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of the Platform will be subject to the exclusive jurisdiction of the courts in Mumbai, India.</p>
                </li>

                <li className='bg-gray-100 mt-5 p-5'><strong>Changes to the Terms</strong>
                    <p>Wetacre Sustainable Solutions Private Limited reserves the right to update or modify these Terms at any time without prior notice. Your continued use of the Platform after any changes signifies your acceptance of the updated Terms.</p>
                </li>
            </ol>

        </>
    )
}

export default Terms