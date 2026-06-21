export default function PolicyPage() {
  return (
    <div className="bg-[#f9f9f0] dark:bg-[#0f0e0b] min-h-screen">
      {/* Header */}
      <div className="bg-[#efecca] pt-28 pb-16 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-code-label text-[#9d937c] uppercase tracking-widest mb-4">Legal</p>
          <h1 className="text-display-large text-[#0f0e0b]">Developer Policy</h1>
          <p className="text-body-large text-[#3d3b34] mt-4">
            Rules of engagement for building within the AlphaJEE ecosystem.
          </p>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 py-16">
        <p className="text-body-small text-[#9d937c] italic text-center mb-12">Last Updated: March 10, 2026</p>

        <div className="prose-alphajee space-y-10">
          <p className="text-body-base text-[#3d3b34] leading-relaxed">
            This policy governs the allocation, management, and branding of all subdomains (e.g., *.alphajee.online) and hosted modules within the AlphaJEE ecosystem. By utilizing AlphaJEE infrastructure, developers agree to the following terms:
          </p>

          {[
            {
              title: '1. Ownership of Infrastructure',
              sections: [
                {
                  heading: 'Domain Rights',
                  body: 'The root domain alphajee.online and all subdomains remain the exclusive property of AlphaJEE.',
                },
                {
                  heading: 'License to Use',
                  body: 'Subdomains are granted to developers as a revocable license. AlphaJEE reserves the right to suspend or terminate any subdomain at its sole discretion for branding misalignment, security risks, or violation of terms.',
                },
              ],
            },
            {
              title: '2. Mandatory Branding Hierarchy',
              body: 'To maintain ecosystem integrity, all hosted projects must adhere to the following UI standards:',
              list: [
                'Primary Attribution: The footer or header of any tool hosted on an AlphaJEE subdomain must explicitly state: "An AlphaJEE Ecosystem Project" or "Powered by AlphaJEE".',
                'Visual Identity: The AlphaJEE logo must be present on all primary landing pages of the subdomain.',
              ],
            },
            {
              title: '3. Independence & Liability',
              sections: [
                {
                  heading: 'Content Responsibility',
                  body: 'While AlphaJEE provides the "house" (hosting/domain), the individual developer is responsible for the "furniture" (content/tool logic).',
                },
                {
                  heading: 'Non-Partnership',
                  body: 'Usage of a subdomain does not constitute a legal partnership, joint venture, or employment. Developers are categorized as Independent Contributors.',
                },
              ],
            },
            {
              title: '4. Termination of Hosting',
              body: 'AlphaJEE reserves the right to reclaim any subdomain if the developer:',
              list: [
                'Attempts to misrepresent AlphaJEE ownership as their own.',
                'Fails to maintain the required branding standards.',
                'Operates the tool in a way that negatively impacts the root domain\'s reputation.',
              ],
            },
          ].map((section, i) => (
            <div key={i} className="border-t border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 pt-8">
              <h2 className="text-heading-2xl text-[#0f0e0b] dark:text-[#f9f9f0] mb-6">{section.title}</h2>
              {section.body && (
                <p className="text-body-base text-[#3d3b34] dark:text-[#9d937c] leading-relaxed mb-4">{section.body}</p>
              )}
              {section.list && (
                <ul className="space-y-3 pl-4">
                  {section.list.map((item, j) => (
                    <li key={j} className="text-body-base text-[#3d3b34] dark:text-[#9d937c] leading-relaxed flex gap-3">
                      <span className="text-[#badbee] flex-shrink-0 mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.sections?.map((sub, j) => (
                <div key={j} className="mt-6">
                  <h3 className="text-subheading text-[#0f0e0b] dark:text-[#f9f9f0] mb-3">{sub.heading}</h3>
                  <p className="text-body-base text-[#3d3b34] dark:text-[#9d937c] leading-relaxed">{sub.body}</p>
                </div>
              ))}
            </div>
          ))}

          {/* Contact */}
          <div className="mt-12 p-8 bg-[#badbee]/20 border border-[#badbee]/40">
            <p className="text-body-base text-[#21201c] dark:text-[#f9f9f0] text-center mb-2">
              The AlphaJEE website and ecosystem are currently owned and operated by{' '}
              <strong>u/Dizzy-Attitude-8174</strong>.
            </p>
            <p className="text-body-base text-[#3d3b34] dark:text-[#9d937c] text-center">
              For policy-related concerns:{' '}
              <a href="mailto:dizzy@alphajee.online" className="text-[#0f0e0b] dark:text-[#f9f9f0] font-semibold hover:opacity-70 transition-opacity">
                dizzy@alphajee.online
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
