import React, { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

const SEO = ({
  title,
  description,
  image,
  url,
  type = "website",
}: SEOProps) => {
  const siteUrl = "https://anamdtech.vercel.app";
  const defaultImage = `${siteUrl}/og-image.png`;
  const siteTitle = "AnaMdTech Solutions";

  const fullURL = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image}`
    : defaultImage;
  const fullTitle = `${title} | ${siteTitle}`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // 2. Helper to update or create meta tags
    const updateMeta = (selector: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        // Determine if it uses 'name' or 'property'
        if (selector.startsWith("meta[property")) {
          element.setAttribute(
            "property",
            selector.replace('meta[property="', "").replace('"]', "")
          );
        } else {
          element.setAttribute(
            "name",
            selector.replace('meta[name="', "").replace('"]', "")
          );
        }
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 3. Update Standard Tags
    updateMeta('meta[name="description"]', description);

    // 4. Update Open Graph (Facebook/LinkedIn)
    updateMeta('meta[property="og:type"]', type);
    updateMeta('meta[property="og:title"]', fullTitle);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="og:image"]', fullImage);
    updateMeta('meta[property="og:url"]', fullURL);
    updateMeta('meta[property="og:site_name"]', siteTitle);

    // 5. Update Twitter
    updateMeta('meta[name="twitter:card"]', "summary_large_image");
    updateMeta('meta[name="twitter:title"]', fullTitle);
    updateMeta('meta[name="twitter:description"]', description);
    updateMeta('meta[name="twitter:image"]', fullImage);
  }, [fullTitle, description, fullImage, fullURL, type]);

  return null; // This component renders nothing visually
};

export default SEO;
