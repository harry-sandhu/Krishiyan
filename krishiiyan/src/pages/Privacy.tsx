import React from 'react'

function Privacy() {
    return (
        <>
            <img src="/Images/logo.png" alt="loading" height={"150px"} width={"150px"} />
            <h3 className='text-2xl underline'>Privacy Policy for <span className='text-[#3FC041] font-bold'>Krishi</span><span className='text-[#3390FF] font-bold'>Yan</span> App</h3>
            <div className='m-5 text-left'>
                <hr />
                <ol>
                    <li className='bg-gray-100 rounded-lg p-5'><strong>Introduction</strong>
                        <p className='indent-8'>Wetacre Sustainable Solutions Private Limited ("Company", "we", or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use the KrishiYan platform ("Platform").</p>
                    </li>

                    <li className='p-5 bg-gray-100 mt-5'><strong>Information We Collect</strong>
                        <ul className='list-disc p-5'>
                            <li>Personal Information: This includes data such as your name, email address, phone number, and FPO details, provided during the registration process.</li>
                            <li>Transactional Data: This includes records of transactions made via the Platform, such as procurement orders, payments, and inventory management data.</li>
                            <li>Usage Data: We may collect information on how you interact with the Platform, including login times, device information, and IP addresses.</li>
                        </ul>
                    </li>

                    <li className='p-5 bg-gray-100 mt-5'><strong>How We Use Your Information</strong>
                        <ul className='list-disc p-5'>
                            <li>To provide and improve the Platform and Services.</li>
                            <li>To process transactions and send necessary communications.</li>
                            <li>To send you updates about our services, promotions, or technical notices.</li>
                            <li>To analyze and improve the performance of the Platform.</li>
                            <li>To comply with legal requirements and regulations.</li>
                        </ul>
                    </li>

                    <li className='p-5 bg-gray-100 mt-5'><strong>Data Sharing</strong>
                        <p>We will never sell or rent your personal information to third parties. We may share your data with:</p>
                        <ul className='list-disc p-5'>
                            <li>Service Providers: We may share your data with third-party service providers to process payments, provide customer support, or analyze usage patterns.</li>
                            <li>FPOs and Buyers: Your data may be shared with FPO members or buyers as part of the services offered by the Platform (e.g., during procurement or market development activities).</li>
                            <li>Legal Compliance: We may disclose your data when required by law or in response to legal proceedings.</li>
                        </ul>
                    </li>

                    <li className='p-5 bg-gray-100 mt-5'><strong>Data Security</strong>
                        <p>We use robust security measures, including encryption and firewalls, to protect your data from unauthorized access, alteration, or disclosure. However, no internet-based service is 100% secure, and we cannot guarantee the absolute security of your data.</p>
                    </li>

                    <li className='p-5 bg-gray-100 mt-5'><strong>Data Retention</strong>
                        <p>We retain your personal data for as long as necessary to provide the services outlined in this Privacy Policy or to comply with legal obligations.</p>
                    </li>

                    <li className='p-5 bg-gray-100 mt-5'><strong>Your Rights</strong>
                        <ul className='list-disc p-5'>
                            <li>Access: You can request access to your data at any time.</li>
                            <li>Correction: You can correct any errors in your data.</li>
                            <li>Deletion: You may request the deletion of your data, though certain legal or business reasons may prevent us from fully deleting all information.</li>
                            <li>Data Portability: You can request a copy of your data in a structured, commonly used format.</li>
                        </ul>
                    </li>

                    <li className='p-5 bg-gray-100 mt-5'><strong>Cookies</strong>
                        <p>We may use cookies and similar technologies to improve your experience on the Platform. You can choose to disable cookies via your browser settings, but this may limit certain functionalities.</p>
                    </li>

                    <li className='p-5 bg-gray-100 mt-5'><strong>Third-Party Links</strong>
                        <p>The Platform may contain links to third-party websites and services that are not operated by us. We are not responsible for the privacy practices of these third-party sites.</p>
                    </li>

                    <li className='p-5 bg-gray-100 mt-5'><strong>Changes to this Privacy Policy</strong>
                        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and your continued use of the Platform after changes are made will constitute your acceptance of those changes.</p>
                    </li>

                    <li className='p-5 bg-gray-100 mt-5'><strong>Contact Us</strong>
                        <p>If you have any questions or concerns about this Privacy Policy or the use of your data, please contact us at info@krishiyan.com.</p>
                    </li>
                </ol>
            </div>
        </>
    )
}

export default Privacy
