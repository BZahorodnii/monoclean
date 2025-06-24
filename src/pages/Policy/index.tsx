import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useGetPrivacyPolicy from '../../hooks/useGetPrivacyPolicy'
import styles from './privacy.module.css'
import { Helmet } from 'react-helmet'

const Policy: React.FC = () => {
  const params = useParams();
  const { slug } = params;
  const { fetch: privacyPolicyFetch, data: privacyPolicyData, errors } = useGetPrivacyPolicy();
  const [policyData, setPolicyData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (errors.length) {
      navigate('/not-found', { replace: true });
    }
  }, [errors]);

  useEffect(() => {
    if (slug) {
      privacyPolicyFetch(params.lang || 'en');
    }
  }, [slug, params]);

  useEffect(() => {
    if (privacyPolicyData) {
      const policy = privacyPolicyData?.find((item: any) => item.slug === slug);
      if (policy) {
        setPolicyData(policy);
        scrollToAnchor();
      } else {
        navigate('/not-found', { replace: true });
      }
    }
  }, [privacyPolicyData]);

  const scrollToAnchor = () => {
    const hash = window.location.hash.slice(1); // Remove the # from the hash
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure content is rendered
    }
  };
  
  if (!privacyPolicyData) return null;

  return (
    <>
      <Helmet>
        <title>{policyData?.title}</title>
        <meta name="description" content={policyData?.title} />
        <meta name="og:title" content={policyData?.title} />
        <meta name="og:description" content={policyData?.title} />
      </Helmet>
      <div className={styles.postContainer}>
        <div dangerouslySetInnerHTML={{ __html: policyData?.content }} />
      </div>
    </>
  )
}

export default Policy;
