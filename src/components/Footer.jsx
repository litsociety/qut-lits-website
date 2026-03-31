import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
import { URLS, SOCIAL_LINKS } from '../constants';

// Icon mapping for social links
const SOCIAL_ICONS = {
  Facebook,
  Instagram,
  LinkedIn: Linkedin,
  Email: Mail,
};

/**
 * Reusable CTA Section with social links
 * Used across Home, About, Events, Sponsors pages
 */
export const CTASection = memo(function CTASection({
  title = "Ready to Shape the Future?",
  description = "Join us today and become part of a community that's driving innovation at the intersection of law and technology.",
  primaryCTA = { text: "Join Now", href: URLS.membership, external: true },
  secondaryCTA = { text: "Learn More", to: "/about" },
  showSocialLinks = true,
}) {
  return (
    <section className="py-24 relative" aria-label="Call to action section">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="liquid-glass-strong rounded-3xl p-8 sm:p-16 border border-white/20 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-6 font-tomorrow">
            {title}
          </h2>
          <p className="text-xl text-white/80 mb-10 font-montserrat max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            {primaryCTA.external ? (
              <a
                href={primaryCTA.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center bg-white/20 backdrop-blur-sm border border-white/30 text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-white/30 hover:border-white/50 transition-all duration-300 font-rubik overflow-hidden"
              >
                <span className="relative z-10">{primaryCTA.text}</span>
              </a>
            ) : (
              <Link
                to={primaryCTA.to}
                className="group relative inline-flex items-center bg-white/20 backdrop-blur-sm border border-white/30 text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-white/30 hover:border-white/50 transition-all duration-300 font-rubik overflow-hidden"
              >
                <span className="relative z-10">{primaryCTA.text}</span>
              </Link>
            )}

            {secondaryCTA && (
              <Link
                to={secondaryCTA.to}
                className="group inline-flex items-center gap-3 border-2 border-white/30 text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm font-rubik"
              >
                {secondaryCTA.text}
                <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            )}
          </div>

          {showSocialLinks && <SocialLinks />}
        </div>
      </div>
    </section>
  );
});

/**
 * Social links row component
 */
export const SocialLinks = memo(function SocialLinks({ className = '' }) {
  return (
    <div className={`flex justify-center items-center gap-4 sm:gap-6 pt-6 border-t border-white/10 ${className}`}>
      {SOCIAL_LINKS.map((link) => {
        const Icon = SOCIAL_ICONS[link.name];
        return (
          <a
            key={link.name}
            href={link.href}
            target={link.name !== 'Email' ? '_blank' : undefined}
            rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
            className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300"
            aria-label={link.ariaLabel}
          >
            <Icon className="h-5 w-5 text-white/70 group-hover:text-primary transition-colors duration-300" />
          </a>
        );
      })}
    </div>
  );
});

CTASection.displayName = 'CTASection';
SocialLinks.displayName = 'SocialLinks';

export default CTASection;
