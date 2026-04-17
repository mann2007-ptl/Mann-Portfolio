import React from 'react';
import { Helmet } from 'react-helmet-async';
import profileImg from '../../assets/photo.jpeg';

export default function SEO({
    title = 'Mann Patel | Full-Stack Developer Portfolio',
    description = 'Mann Patel is a Full-Stack Developer skilled in React, Node.js, Express, MongoDB, JavaScript, and modern UI development.',
    name = 'Mann Patel',
    type = 'website',
    url = typeof window !== 'undefined' ? window.location.href : 'https://mann-portfolio-six.vercel.app/',
    keywords = 'Full Stack Developer, MERN Stack Developer, React Developer, Software Engineer, Frontend Engineer'
}) {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://mann-portfolio-six.vercel.app';
    const computedImage = `${origin}${profileImg}`;

    // Generate Rich Structured Data (JSON-LD) dynamically
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": "https://mann-portfolio-six.vercel.app/#person",
                "name": "Mann Patel",
                "url": "https://mann-portfolio-six.vercel.app/",
                "image": {
                    "@type": "ImageObject",
                    "@id": "https://mann-portfolio-six.vercel.app/#personImage",
                    "url": computedImage,
                    "contentUrl": computedImage,
                    "caption": "Mann Patel"
                },
                "jobTitle": "Full-Stack Developer",
                "description": description,
                "sameAs": [
                    "https://github.com/mann2007-ptl",
                    "https://www.linkedin.com/in/mann-patel-839b33399",
                    "https://www.youtube.com/@patelmann7197",
                    "https://leetcode.com/u/Mann2006/",
                    "https://x.com/mann_ptl_20"
                ]
            },
            {
                "@type": "ProfilePage",
                "@id": "https://mann-portfolio-six.vercel.app/#profile",
                "url": url,
                "name": title,
                "mainEntity": {
                    "@id": "https://mann-portfolio-six.vercel.app/#person"
                },
                "image": {
                    "@id": "https://mann-portfolio-six.vercel.app/#personImage"
                }
            },
            {
                "@type": "WebSite",
                "@id": "https://mann-portfolio-six.vercel.app/#website",
                "url": "https://mann-portfolio-six.vercel.app/",
                "name": "Mann Patel Portfolio",
                "publisher": {
                    "@id": "https://mann-portfolio-six.vercel.app/#person"
                },
                "inLanguage": "en-IN"
            },
            {
                "@type": "WebPage",
                "@id": `${url}#webpage`,
                "url": url,
                "name": title,
                "description": description,
                "isPartOf": {
                    "@id": "https://mann-portfolio-six.vercel.app/#website"
                },
                "about": {
                    "@id": "https://mann-portfolio-six.vercel.app/#person"
                },
                "primaryImageOfPage": {
                    "@id": "https://mann-portfolio-six.vercel.app/#personImage"
                },
                "inLanguage": "en-IN"
            },
            {
                "@type": "SoftwareApplication",
                "@id": "https://mann-portfolio-six.vercel.app/#software",
                "name": "Software Projects",
                "applicationCategory": "DeveloperApplication",
                "operatingSystem": "Web",
                "author": {
                    "@id": "https://mann-portfolio-six.vercel.app/#person"
                }
            }
        ]
    };

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={computedImage} />
            <meta property="og:site_name" content={name} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@mann_ptl_20" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={computedImage} />

            {/* Dynamic Inject: Structured Data JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
}
