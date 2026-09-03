import type { ServiceSlug } from '@/lib/site'

export type ServiceStory = {
  fitTitle: string
  fit: string[]
  scenes: { title: string; text: string }[]
  prepareTitle: string
  prepare: string[]
  faqTitle: string
  faqs: { question: string; answer: string }[]
  related: ServiceSlug[]
}

type ServiceStories = Record<ServiceSlug, ServiceStory>

export const SERVICE_STORIES: Record<'en' | 'de', ServiceStories> = {
  en: {
    'air-freight': {
      fitTitle: 'When time leads the route.',
      fit: ['Priority cargo that cannot wait for a longer sea journey', 'Smaller or high-value consignments needing careful coordination', 'Shipments that need airport-to-door planning'],
      scenes: [
        { title: 'Start with the shipment, not a template.', text: 'Tell us what is moving, where it starts and where it needs to arrive. We begin by understanding the practical requirement behind the urgency.' },
        { title: 'A route built around the handovers.', text: 'Our team coordinates collection, airport handling and the onward journey so the shipment has one clear path from departure to arrival.' },
        { title: 'Stay close to the movement.', text: 'We keep communication clear as the shipment moves, and coordinate the next handover at the destination.' },
      ],
      prepareTitle: 'Bring the essentials to the first conversation.',
      prepare: ['Origin and destination city or country', 'What is being shipped and how it is packed', 'Approximate quantity, dimensions or weight', 'Your preferred collection or delivery timing'],
      faqTitle: 'Air freight, clarified.',
      faqs: [
        { question: 'Is air freight right for every shipment?', answer: 'It is often the right choice when timing is the main priority. Share the shipment details with us and we will discuss the most suitable route.' },
        { question: 'Can you help with export paperwork?', answer: 'We provide coordination and support around export documentation. Requirements depend on the cargo and destination, so we confirm the right next steps with you.' },
        { question: 'Can air freight continue to the final destination?', answer: 'We coordinate airport-to-door handovers where available within our network. Your route is confirmed as part of the quotation process.' },
      ],
      related: ['commercial-cargo', 'storage'],
    },
    'sea-freight': {
      fitTitle: 'When scale shapes the journey.',
      fit: ['Heavy, bulky or higher-volume cargo', 'Shipments where cost efficiency matters more than speed', 'Container or consolidated cargo moving from European ports'],
      scenes: [
        { title: 'Make room for the full shipment.', text: 'Sea freight begins with the real shape of your cargo: loose pieces, pallets, household goods or a full container requirement.' },
        { title: 'Coordinate the port-to-door chain.', text: 'We bring collection, consolidation, port handling and onward delivery into one connected plan.' },
        { title: 'Keep the long journey legible.', text: 'A longer route still needs clear communication. We stay available through the handovers that carry your cargo to its destination.' },
      ],
      prepareTitle: 'A clearer brief creates a clearer route.',
      prepare: ['Origin and destination city or country', 'Cargo type and packing format', 'Number of pieces, pallets or estimated volume', 'Whether timing or cost is the stronger priority'],
      faqTitle: 'Sea freight, clarified.',
      faqs: [
        { question: 'Do you handle both container and consolidated cargo?', answer: 'We coordinate container and consolidated shipments. The right approach depends on the size, packing and destination of your cargo.' },
        { question: 'Can sea freight be connected to delivery inland?', answer: 'We coordinate port-to-door handovers where available. We confirm the practical route for your destination before booking.' },
        { question: 'Can I combine storage with sea freight?', answer: 'Yes. Berlin-based storage can support a shipment schedule before the onward sea journey.' },
      ],
      related: ['storage', 'commercial-cargo'],
    },
    'vehicle-shipping': {
      fitTitle: 'When the cargo has wheels.',
      fit: ['Cars, trucks, buses and special equipment', 'Vehicle purchases that need an international onward journey', 'Shipments requiring vehicle and export paperwork coordination'],
      scenes: [
        { title: 'Begin with the vehicle in front of you.', text: 'A single vehicle and a fleet do not start from the same place. We establish the vehicle type, collection point and destination before planning the route.' },
        { title: 'Choose the practical movement.', text: 'Where available, we coordinate container and RoRo options around the vehicle, the route and the handovers involved.' },
        { title: 'Connect paperwork to departure.', text: 'Purchase and export paperwork support is coordinated alongside the transport plan, so the journey is considered as one process.' },
      ],
      prepareTitle: 'Have the vehicle story ready.',
      prepare: ['Vehicle type, make and model', 'Collection point and destination', 'Whether the vehicle has already been purchased', 'Any timing or handover considerations'],
      faqTitle: 'Vehicle shipping, clarified.',
      faqs: [
        { question: 'Which vehicles can you coordinate?', answer: 'We coordinate cars, trucks, buses and special equipment. Tell us about the vehicle and we will discuss the appropriate route.' },
        { question: 'What is RoRo?', answer: 'RoRo is one vehicle-shipping option available on selected routes. We confirm whether it is suitable and available for your particular shipment.' },
        { question: 'Can you help before I buy a vehicle?', answer: 'Yes. Our vehicle sourcing service can support the search and purchase process, then connect directly to shipping.' },
      ],
      related: ['vehicle-sourcing', 'storage'],
    },
    'commercial-cargo': {
      fitTitle: 'When the shipment supports the business.',
      fit: ['Recurring or one-off business consignments', 'Palletised or loose commercial goods', 'Routes that may combine air, sea and land coordination'],
      scenes: [
        { title: 'Understand what the cargo needs to support.', text: 'The shipment may serve a store, a project or a recurring supply rhythm. We begin with that operating need, not only the cartons.' },
        { title: 'Build coordination around the goods.', text: 'We plan the appropriate air, sea or land option around the cargo, its packing and the destination handovers.' },
        { title: 'Give the route a consistent point of contact.', text: 'From the first requirement to destination coordination, one team keeps the movement and communication connected.' },
      ],
      prepareTitle: 'Make the business requirement visible.',
      prepare: ['Origin and destination city or country', 'Goods description and packing format', 'Frequency if shipments recur', 'Quantity, dimensions or pallet count'],
      faqTitle: 'Commercial cargo, clarified.',
      faqs: [
        { question: 'Do you coordinate recurring shipments?', answer: 'Yes. We support both recurring and one-off commercial cargo requirements.' },
        { question: 'Which transport mode should I choose?', answer: 'Air, sea and land options depend on your goods, destination and priorities. We review those factors with you before recommending a route.' },
        { question: 'Can you support customs documentation?', answer: 'We provide coordination and support around customs documentation. The documents required depend on the cargo and destination.' },
      ],
      related: ['air-freight', 'sea-freight'],
    },
    'personal-effects': {
      fitTitle: 'When what moves is personal.',
      fit: ['Boxes, luggage and household goods', 'Individuals relocating or sending belongings abroad', 'Flexible shipment sizes that need personal guidance'],
      scenes: [
        { title: 'Start with the things that matter.', text: 'Personal effects are not simply a list of items. We begin by understanding what you are moving, where it is going and how you want the process to feel.' },
        { title: 'Turn a move into manageable steps.', text: 'We help you prepare for collection and coordinate the onward shipment with clear communication along the way.' },
        { title: 'Keep a person at the centre of the route.', text: 'Our team remains your point of contact from the first question to the destination handover.' },
      ],
      prepareTitle: 'A few details help us guide you well.',
      prepare: ['Where the belongings are collected and delivered', 'An overview of the items being moved', 'Estimated number of boxes or pieces', 'Your intended moving or delivery window'],
      faqTitle: 'Personal effects, clarified.',
      faqs: [
        { question: 'Can you help with a small shipment as well as a move?', answer: 'Yes. We coordinate flexible shipment sizes, from boxes and luggage to household goods.' },
        { question: 'How should I pack my belongings?', answer: 'We advise you on preparation before shipment or storage. The best approach depends on the items and route.' },
        { question: 'Can storage be part of the move?', answer: 'Yes. We can connect Berlin-based storage to your shipping schedule when you need space between stages.' },
      ],
      related: ['storage', 'air-freight'],
    },
    'vehicle-sourcing': {
      fitTitle: 'When the journey starts before the purchase.',
      fit: ['Customers looking for a vehicle in Europe', 'Purchases needing search, inspection or negotiation support', 'A vehicle purchase that will continue into international shipping'],
      scenes: [
        { title: 'Start with the vehicle you need.', text: 'Tell us what you are looking for, your intended use and where the vehicle will ultimately travel. The search begins with the full destination in mind.' },
        { title: 'Connect the purchase to practical checks.', text: 'We assist with sourcing, inspection and purchase support so the vehicle decision is made with the next stage in view.' },
        { title: 'Move seamlessly from purchase to shipping.', text: 'Once the vehicle is ready, the same team can connect the purchase process to international vehicle shipping.' },
      ],
      prepareTitle: 'Set the search up for a useful start.',
      prepare: ['Vehicle type, make or preferred model', 'Intended destination', 'Your approximate budget or purchase priorities', 'Whether you also need international shipping'],
      faqTitle: 'Vehicle sourcing, clarified.',
      faqs: [
        { question: 'Can you help find a vehicle across Europe?', answer: 'Yes. We assist with vehicle search across Europe and can discuss the requirements that matter most to you.' },
        { question: 'Do you help with purchase support?', answer: 'We assist with purchasing, negotiation, inspection and paperwork support as part of the sourcing process.' },
        { question: 'Can sourcing and shipping be arranged together?', answer: 'Yes. Vehicle sourcing is designed to connect directly to our international vehicle shipping coordination.' },
      ],
      related: ['vehicle-shipping', 'storage'],
    },
    storage: {
      fitTitle: 'When the schedule needs breathing room.',
      fit: ['Goods waiting for a shipping window', 'Private or retail items needing interim space in Berlin', 'Shipments that benefit from storage before onward movement'],
      scenes: [
        { title: 'Create space between two movements.', text: 'Storage gives your goods a deliberate pause—whether you are waiting on a collection, a purchase or the next shipment stage.' },
        { title: 'Keep the goods close to the plan.', text: 'Our Berlin-based warehouse connects storage to the next transport decision, rather than leaving it as a separate task.' },
        { title: 'Release when the route is ready.', text: 'When your onward schedule is in place, we coordinate the next handover into the chosen transport service.' },
      ],
      prepareTitle: 'Tell us what space needs to do.',
      prepare: ['What needs to be stored', 'Approximate number of items, pallets or boxes', 'When storage should begin', 'Whether goods will continue into a DEexpress shipment'],
      faqTitle: 'Storage, clarified.',
      faqs: [
        { question: 'Where is the storage located?', answer: 'Our storage and warehousing service is based in Berlin.' },
        { question: 'Can individuals and businesses use the service?', answer: 'Yes. We provide storage for retail and private customers.' },
        { question: 'Can storage be connected to onward transport?', answer: 'Yes. Storage is coordinated directly with your shipping schedule when goods are ready to move.' },
      ],
      related: ['sea-freight', 'personal-effects'],
    },
  },
  de: {
    'air-freight': { fitTitle: 'Wenn Zeit die Route bestimmt.', fit: ['Prioritäre Fracht, die nicht auf eine längere Seereise warten kann', 'Kleinere oder hochwertige Sendungen mit sorgfältigem Koordinationsbedarf', 'Sendungen mit Planung vom Flughafen bis zur Tür'], scenes: [{ title: 'Beginnen Sie mit der Sendung, nicht mit einer Vorlage.', text: 'Sagen Sie uns, was bewegt wird, wo es startet und wo es ankommen soll. Wir verstehen zuerst den praktischen Bedarf hinter der Dringlichkeit.' }, { title: 'Eine Route, die auf Übergaben ausgelegt ist.', text: 'Unser Team koordiniert Abholung, Flughafenabwicklung und Weitertransport, damit die Sendung einen klaren Weg von Abflug bis Ankunft hat.' }, { title: 'Bleiben Sie nah an der Bewegung.', text: 'Wir halten die Kommunikation klar und koordinieren die nächste Übergabe am Zielort.' }], prepareTitle: 'Bringen Sie die wichtigsten Angaben zum ersten Gespräch mit.', prepare: ['Ursprungs- und Zielort', 'Was versendet wird und wie es verpackt ist', 'Ungefähre Menge, Maße oder Gewicht', 'Gewünschter Abhol- oder Lieferzeitpunkt'], faqTitle: 'Luftfracht, klar erklärt.', faqs: [{ question: 'Ist Luftfracht für jede Sendung geeignet?', answer: 'Sie ist oft richtig, wenn Zeit die wichtigste Priorität ist. Teilen Sie uns die Details mit, und wir besprechen die passende Route.' }, { question: 'Helfen Sie bei Exportdokumenten?', answer: 'Wir koordinieren und unterstützen bei Exportdokumenten. Die Anforderungen hängen von Fracht und Ziel ab.' }, { question: 'Kann Luftfracht bis zum Endziel weitergeführt werden?', answer: 'Wir koordinieren Flughafen-bis-Tür-Übergaben, wo sie in unserem Netzwerk verfügbar sind.' }], related: ['commercial-cargo', 'storage'] },
    'sea-freight': { fitTitle: 'Wenn Umfang die Reise prägt.', fit: ['Schwere, sperrige oder größere Frachtmengen', 'Sendungen, bei denen Kosteneffizienz wichtiger ist als Tempo', 'Container- oder Sammelladungen aus europäischen Häfen'], scenes: [{ title: 'Geben Sie der ganzen Sendung Raum.', text: 'Seefracht beginnt mit der tatsächlichen Form Ihrer Fracht: Einzelstücke, Paletten, Umzugsgut oder ein voller Container.' }, { title: 'Die Kette vom Hafen bis zur Tür koordinieren.', text: 'Wir verbinden Abholung, Konsolidierung, Hafenabwicklung und Weitertransport in einem Plan.' }, { title: 'Die lange Reise nachvollziehbar halten.', text: 'Auch eine lange Route braucht klare Kommunikation. Wir bleiben bei den Übergaben bis zum Ziel erreichbar.' }], prepareTitle: 'Ein klarer Auftrag schafft eine klare Route.', prepare: ['Ursprungs- und Zielort', 'Frachtart und Verpackungsform', 'Anzahl der Stücke, Paletten oder geschätztes Volumen', 'Ob Zeit oder Kosten die höhere Priorität haben'], faqTitle: 'Seefracht, klar erklärt.', faqs: [{ question: 'Koordinieren Sie Container und Sammelladungen?', answer: 'Wir koordinieren Container- und Sammelsendungen. Die passende Lösung hängt von Größe, Verpackung und Ziel ab.' }, { question: 'Kann Seefracht mit Inlandslieferung verbunden werden?', answer: 'Wir koordinieren Hafen-bis-Tür-Übergaben, wo verfügbar, und bestätigen die praktische Route vor der Buchung.' }, { question: 'Kann ich Lagerung mit Seefracht verbinden?', answer: 'Ja. Lagerung in Berlin kann Ihren Versandplan vor der Seereise unterstützen.' }], related: ['storage', 'commercial-cargo'] },
    'vehicle-shipping': { fitTitle: 'Wenn die Fracht Räder hat.', fit: ['Pkw, Lkw, Busse und Sonderfahrzeuge', 'Fahrzeugkäufe mit internationalem Weitertransport', 'Sendungen mit Koordination von Fahrzeug- und Exportpapieren'], scenes: [{ title: 'Mit dem Fahrzeug vor Ihnen beginnen.', text: 'Ein einzelnes Fahrzeug und eine Flotte starten nicht gleich. Wir klären Fahrzeugtyp, Abholort und Ziel, bevor die Route geplant wird.' }, { title: 'Die praktische Transportart wählen.', text: 'Wo verfügbar, koordinieren wir Container- und RoRo-Optionen passend zu Fahrzeug, Route und Übergaben.' }, { title: 'Papiere mit dem Abfahrtsplan verbinden.', text: 'Unterstützung bei Kauf- und Exportpapieren wird zusammen mit dem Transportplan koordiniert.' }], prepareTitle: 'Halten Sie die Fahrzeuggeschichte bereit.', prepare: ['Fahrzeugtyp, Marke und Modell', 'Abholort und Ziel', 'Ob das Fahrzeug bereits gekauft ist', 'Zeitliche oder Übergabe-Anforderungen'], faqTitle: 'Fahrzeugtransport, klar erklärt.', faqs: [{ question: 'Welche Fahrzeuge koordinieren Sie?', answer: 'Wir koordinieren Pkw, Lkw, Busse und Sonderfahrzeuge. Sagen Sie uns mehr über das Fahrzeug.' }, { question: 'Was ist RoRo?', answer: 'RoRo ist eine Fahrzeugtransportoption auf ausgewählten Routen. Wir bestätigen die Eignung für Ihre Sendung.' }, { question: 'Helfen Sie auch vor dem Fahrzeugkauf?', answer: 'Ja. Unsere Fahrzeugbeschaffung unterstützt Suche und Kauf und verbindet sich direkt mit dem Versand.' }], related: ['vehicle-sourcing', 'storage'] },
    'commercial-cargo': { fitTitle: 'Wenn die Sendung das Geschäft unterstützt.', fit: ['Wiederkehrende oder einmalige Geschäftssendungen', 'Palettierte oder lose Handelswaren', 'Routen mit Luft-, See- und Landkoordination'], scenes: [{ title: 'Verstehen, was die Fracht ermöglichen soll.', text: 'Die Sendung kann ein Geschäft, ein Projekt oder einen wiederkehrenden Versorgungsrhythmus bedienen. Damit beginnen wir, nicht nur mit den Kartons.' }, { title: 'Die Koordination um die Ware aufbauen.', text: 'Wir planen die passende Luft-, See- oder Landoption nach Fracht, Verpackung und Übergaben am Ziel.' }, { title: 'Ein durchgehender Ansprechpartner für die Route.', text: 'Von der ersten Anforderung bis zur Zielkoordination hält ein Team Bewegung und Kommunikation zusammen.' }], prepareTitle: 'Machen Sie die geschäftliche Anforderung sichtbar.', prepare: ['Ursprungs- und Zielort', 'Warenbeschreibung und Verpackungsform', 'Häufigkeit bei wiederkehrenden Sendungen', 'Menge, Maße oder Palettenzahl'], faqTitle: 'Kommerzielle Fracht, klar erklärt.', faqs: [{ question: 'Koordinieren Sie wiederkehrende Sendungen?', answer: 'Ja. Wir unterstützen wiederkehrende und einmalige gewerbliche Frachtanforderungen.' }, { question: 'Welche Transportart sollte ich wählen?', answer: 'Luft-, See- und Landoptionen hängen von Ware, Ziel und Prioritäten ab. Wir prüfen dies gemeinsam.' }, { question: 'Unterstützen Sie bei Zolldokumenten?', answer: 'Wir koordinieren und unterstützen bei Zolldokumenten. Die benötigten Unterlagen hängen von Fracht und Ziel ab.' }], related: ['air-freight', 'sea-freight'] },
    'personal-effects': { fitTitle: 'Wenn das Umziehende persönlich ist.', fit: ['Kartons, Gepäck und Haushaltsgüter', 'Privatpersonen beim Umzug oder Versand ins Ausland', 'Flexible Sendungsgrößen mit persönlicher Begleitung'], scenes: [{ title: 'Mit den Dingen beginnen, die wichtig sind.', text: 'Persönliche Gegenstände sind nicht einfach eine Liste. Wir verstehen, was Sie bewegen, wohin es geht und wie sich der Prozess anfühlen soll.' }, { title: 'Einen Umzug in überschaubare Schritte verwandeln.', text: 'Wir helfen bei der Vorbereitung der Abholung und koordinieren den Weitertransport mit klarer Kommunikation.' }, { title: 'Eine Person im Mittelpunkt der Route behalten.', text: 'Unser Team bleibt Ihr Ansprechpartner von der ersten Frage bis zur Übergabe am Ziel.' }], prepareTitle: 'Ein paar Angaben helfen uns, Sie gut zu begleiten.', prepare: ['Abhol- und Lieferort', 'Überblick über die zu versendenden Gegenstände', 'Geschätzte Anzahl von Kartons oder Stücken', 'Geplanter Umzugs- oder Lieferzeitraum'], faqTitle: 'Umzugsgut, klar erklärt.', faqs: [{ question: 'Helfen Sie bei kleinen Sendungen und Umzügen?', answer: 'Ja. Wir koordinieren flexible Größen, von Kartons und Gepäck bis zu Haushaltsgütern.' }, { question: 'Wie sollte ich meine Sachen verpacken?', answer: 'Wir beraten Sie vor Versand oder Lagerung zur Vorbereitung. Die beste Lösung hängt von Gegenständen und Route ab.' }, { question: 'Kann Lagerung Teil des Umzugs sein?', answer: 'Ja. Wir verbinden Berliner Lagerung mit Ihrem Versandplan, wenn Sie Raum zwischen den Schritten benötigen.' }], related: ['storage', 'air-freight'] },
    'vehicle-sourcing': { fitTitle: 'Wenn die Reise vor dem Kauf beginnt.', fit: ['Kunden auf der Suche nach einem Fahrzeug in Europa', 'Käufe mit Unterstützung bei Suche, Prüfung oder Verhandlung', 'Fahrzeugkäufe mit anschließendem internationalem Versand'], scenes: [{ title: 'Mit dem benötigten Fahrzeug beginnen.', text: 'Sagen Sie uns, wonach Sie suchen, wofür das Fahrzeug gedacht ist und wohin es reisen soll. Die Suche beginnt mit dem Ziel im Blick.' }, { title: 'Den Kauf mit praktischen Prüfungen verbinden.', text: 'Wir unterstützen bei Suche, Prüfung und Kauf, damit die Fahrzeugentscheidung auch den nächsten Schritt berücksichtigt.' }, { title: 'Nahtlos vom Kauf zum Versand wechseln.', text: 'Sobald das Fahrzeug bereit ist, kann dasselbe Team den Kaufprozess mit internationalem Versand verbinden.' }], prepareTitle: 'Richten Sie die Suche sinnvoll ein.', prepare: ['Fahrzeugtyp, Marke oder bevorzugtes Modell', 'Geplantes Ziel', 'Ungefähres Budget oder Kaufprioritäten', 'Ob Sie auch internationalen Versand benötigen'], faqTitle: 'Fahrzeugbeschaffung, klar erklärt.', faqs: [{ question: 'Helfen Sie bei der Fahrzeugsuche in Europa?', answer: 'Ja. Wir unterstützen bei der Suche in ganz Europa und besprechen die für Sie wichtigen Anforderungen.' }, { question: 'Unterstützen Sie beim Kauf?', answer: 'Wir helfen bei Kauf, Verhandlung, Prüfung und Papierarbeit als Teil der Beschaffung.' }, { question: 'Können Beschaffung und Versand zusammen organisiert werden?', answer: 'Ja. Die Fahrzeugbeschaffung ist direkt mit unserer internationalen Versandkoordination verbunden.' }], related: ['vehicle-shipping', 'storage'] },
    storage: { fitTitle: 'Wenn der Zeitplan Raum braucht.', fit: ['Waren, die auf ein Versandfenster warten', 'Private oder Handelsgüter mit Zwischenlagerung in Berlin', 'Sendungen, die vor dem Weitertransport Lagerung benötigen'], scenes: [{ title: 'Raum zwischen zwei Bewegungen schaffen.', text: 'Lagerung gibt Ihren Waren eine bewusste Pause—ob Sie auf Abholung, Kauf oder die nächste Versandphase warten.' }, { title: 'Die Waren nah am Plan halten.', text: 'Unser Lager in Berlin verbindet Lagerung mit der nächsten Transportentscheidung statt sie zu einer separaten Aufgabe zu machen.' }, { title: 'Freigeben, wenn die Route bereit ist.', text: 'Sobald der Weitertransport geplant ist, koordinieren wir die nächste Übergabe in den gewählten Service.' }], prepareTitle: 'Sagen Sie uns, was der Raum leisten soll.', prepare: ['Was gelagert werden soll', 'Ungefähre Anzahl von Gegenständen, Paletten oder Kartons', 'Wann die Lagerung beginnen soll', 'Ob die Waren mit DEexpress weitertransportiert werden'], faqTitle: 'Lagerung, klar erklärt.', faqs: [{ question: 'Wo befindet sich die Lagerung?', answer: 'Unser Lager- und Warehousing-Service befindet sich in Berlin.' }, { question: 'Können Privatpersonen und Unternehmen den Service nutzen?', answer: 'Ja. Wir lagern für Handels- und Privatkunden.' }, { question: 'Kann Lagerung mit Weitertransport verbunden werden?', answer: 'Ja. Lagerung wird mit Ihrem Versandplan koordiniert, wenn die Waren bereit sind.' }], related: ['sea-freight', 'personal-effects'] },
  },
}

export type ServiceEnhancement = {
  optionsTitle: string
  options: { title: string; text: string }[]
  combinationTitle: string
  combinationText: string
}

export const SERVICE_ENHANCEMENTS: Record<'en' | 'de', Record<ServiceSlug, ServiceEnhancement>> = {
  en: {
    'air-freight': { optionsTitle: 'Choose the pace that fits the shipment.', options: [{ title: 'Priority cargo', text: 'For shipments where time shapes the planning conversation from the first call.' }, { title: 'High-value movement', text: 'Careful coordination for cargo that needs a clear, closely managed handover.' }], combinationTitle: 'Connect speed to the wider route.', combinationText: 'Air freight can sit within a broader commercial cargo plan, with storage available in Berlin when the shipping schedule needs a pause.' },
    'sea-freight': { optionsTitle: 'Make the journey fit the load.', options: [{ title: 'Container cargo', text: 'A practical route for larger, heavier or more defined shipment volumes.' }, { title: 'Consolidated cargo', text: 'A coordinated option for goods that do not require a full container on their own.' }], combinationTitle: 'Let sea freight work with the whole chain.', combinationText: 'Sea freight connects naturally with Berlin storage and commercial cargo coordination, keeping the journey planned beyond the port.' },
    'vehicle-shipping': { optionsTitle: 'Move the vehicle on the route that suits it.', options: [{ title: 'Container options', text: 'A protected route considered around the vehicle, the destination and the planned handovers.' }, { title: 'RoRo options', text: 'Available on selected routes for suitable vehicles; the team confirms the practical choice with you.' }], combinationTitle: 'From finding the vehicle to moving it.', combinationText: 'Vehicle sourcing can lead directly into vehicle shipping, with storage available when purchase and departure dates do not align.' },
    'commercial-cargo': { optionsTitle: 'Plan around the commercial need.', options: [{ title: 'One-off cargo', text: 'A coordinated movement for a single commercial requirement or project.' }, { title: 'Recurring cargo', text: 'A consistent point of contact for repeat movements and evolving route needs.' }], combinationTitle: 'Choose the mode around the goods.', combinationText: 'Commercial cargo can move by air or sea, with the route shaped around the goods, destination and the priority you set.' },
    'personal-effects': { optionsTitle: 'Make a personal move feel manageable.', options: [{ title: 'Smaller personal shipments', text: 'Boxes, luggage and individual belongings coordinated with practical guidance.' }, { title: 'Household moves', text: 'A clearer path for larger collections of personal effects moving across borders.' }], combinationTitle: 'Create room when a move needs time.', combinationText: 'Personal effects can be connected to Berlin storage or air freight when timing, size and destination call for a different next step.' },
    'vehicle-sourcing': { optionsTitle: 'Bring clarity to the purchase journey.', options: [{ title: 'Vehicle search', text: 'Support to identify a suitable vehicle across Europe around the needs you define.' }, { title: 'Purchase support', text: 'Inspection, negotiation and paperwork support considered before the vehicle begins its onward journey.' }], combinationTitle: 'One journey from search to shipment.', combinationText: 'Vehicle sourcing is designed to move naturally into vehicle shipping, giving the purchase and international handover one connected team.' },
    storage: { optionsTitle: 'Use space as part of the plan.', options: [{ title: 'Short-term storage', text: 'A practical pause while a collection, purchase or departure date is being coordinated.' }, { title: 'Longer-term warehousing', text: 'Berlin-based space for private or retail goods that need to stay ready for the next movement.' }], combinationTitle: 'Keep storage connected to movement.', combinationText: 'Storage can lead straight into sea freight, personal effects shipping or another service when the onward schedule is ready.' },
  },
  de: {
    'air-freight': { optionsTitle: 'Wählen Sie das Tempo, das zur Sendung passt.', options: [{ title: 'Prioritäre Fracht', text: 'Für Sendungen, bei denen Zeit vom ersten Gespräch an die Planung prägt.' }, { title: 'Hochwertige Fracht', text: 'Sorgfältige Koordination für Güter mit klarer, eng begleiteter Übergabe.' }], combinationTitle: 'Tempo mit der gesamten Route verbinden.', combinationText: 'Luftfracht kann Teil eines größeren Plans für kommerzielle Fracht sein; Berliner Lagerung schafft Raum, wenn der Zeitplan es braucht.' },
    'sea-freight': { optionsTitle: 'Lassen Sie die Reise zur Ladung passen.', options: [{ title: 'Containerfracht', text: 'Eine praktische Route für größere, schwerere oder klar definierte Mengen.' }, { title: 'Sammelfracht', text: 'Eine koordinierte Option für Güter, die keinen eigenen Vollcontainer benötigen.' }], combinationTitle: 'Seefracht als Teil der ganzen Kette.', combinationText: 'Seefracht verbindet sich mit Berliner Lagerung und kommerzieller Frachtkoordination, damit die Planung nicht am Hafen endet.' },
    'vehicle-shipping': { optionsTitle: 'Bewegen Sie das Fahrzeug auf der passenden Route.', options: [{ title: 'Containeroptionen', text: 'Eine geschützte Route, die um Fahrzeug, Ziel und geplante Übergaben herum betrachtet wird.' }, { title: 'RoRo-Optionen', text: 'Auf ausgewählten Routen für passende Fahrzeuge verfügbar; unser Team bestätigt die praktische Wahl.' }], combinationTitle: 'Vom Finden des Fahrzeugs bis zum Versand.', combinationText: 'Fahrzeugbeschaffung kann direkt in den Versand führen; Lagerung hilft, wenn Kauf- und Abfahrtsdaten nicht zusammenpassen.' },
    'commercial-cargo': { optionsTitle: 'Planen Sie nach dem geschäftlichen Bedarf.', options: [{ title: 'Einmalige Fracht', text: 'Eine koordinierte Bewegung für eine einzelne gewerbliche Anforderung oder ein Projekt.' }, { title: 'Wiederkehrende Fracht', text: 'Ein beständiger Ansprechpartner für wiederholte Sendungen und neue Routenanforderungen.' }], combinationTitle: 'Wählen Sie den Modus nach der Ware.', combinationText: 'Kommerzielle Fracht kann per Luft oder See bewegt werden; die Route richtet sich nach Ware, Ziel und Ihrer Priorität.' },
    'personal-effects': { optionsTitle: 'Machen Sie einen persönlichen Umzug überschaubar.', options: [{ title: 'Kleinere persönliche Sendungen', text: 'Kartons, Gepäck und persönliche Dinge mit praktischer Begleitung.' }, { title: 'Haushaltsumzüge', text: 'Ein klarer Weg für größere Mengen persönlicher Gegenstände über Grenzen hinweg.' }], combinationTitle: 'Raum schaffen, wenn ein Umzug Zeit braucht.', combinationText: 'Persönliche Gegenstände können mit Berliner Lagerung oder Luftfracht verbunden werden, wenn Zeit, Größe und Ziel einen anderen Schritt erfordern.' },
    'vehicle-sourcing': { optionsTitle: 'Schaffen Sie Klarheit im Kaufprozess.', options: [{ title: 'Fahrzeugsuche', text: 'Unterstützung bei der Suche nach einem passenden Fahrzeug in Europa nach Ihren Anforderungen.' }, { title: 'Kaufunterstützung', text: 'Prüfung, Verhandlung und Papierarbeit werden betrachtet, bevor das Fahrzeug weiterreist.' }], combinationTitle: 'Eine Reise von der Suche bis zum Versand.', combinationText: 'Fahrzeugbeschaffung ist direkt mit Fahrzeugtransport verbunden, damit Kauf und internationale Übergabe durch ein Team laufen.' },
    storage: { optionsTitle: 'Nutzen Sie Raum als Teil des Plans.', options: [{ title: 'Kurzfristige Lagerung', text: 'Eine praktische Pause, während Abholung, Kauf oder Abfahrt koordiniert werden.' }, { title: 'Längere Lagerung', text: 'Berliner Raum für private oder Handelsgüter, die bereit für die nächste Bewegung bleiben sollen.' }], combinationTitle: 'Lagerung mit Bewegung verbinden.', combinationText: 'Lagerung kann direkt in Seefracht, Umzugsgutversand oder einen anderen Service führen, wenn der Weitertransport bereit ist.' },
  },
}

export const SERVICE_PROOF_COPY = {
  en: {
    title: 'What DEexpress coordinates for each shipment.',
    benefits: [
      { title: 'Route planning', text: 'Origin, destination, cargo type and timing are reviewed before the transport plan is confirmed.' },
      { title: 'Handover coordination', text: 'Collection, carrier or port/airport handling, and destination handover are planned as connected steps.' },
      { title: 'Documentation support', text: 'Where relevant to the service, the team supports the export, customs or purchase-document process.' },
    ],
    contactTitle: 'Discuss the shipment with the team handling the request.',
    contactText: 'Provide the cargo, origin, destination and expected timing. The team can then confirm the next practical step.',
    callLabel: 'Call directly',
  },
  de: {
    title: 'Was DEexpress für jede Sendung koordiniert.',
    benefits: [
      { title: 'Routenplanung', text: 'Ursprung, Ziel, Frachtart und Zeitpunkt werden geprüft, bevor der Transportplan bestätigt wird.' },
      { title: 'Koordination der Übergaben', text: 'Abholung, Abwicklung bei Carrier, Hafen oder Flughafen und die Zielübergabe werden als zusammenhängende Schritte geplant.' },
      { title: 'Dokumentenunterstützung', text: 'Wo es für den Service relevant ist, unterstützt das Team bei Export-, Zoll- oder Kaufdokumenten.' },
    ],
    contactTitle: 'Besprechen Sie die Sendung mit dem Team, das die Anfrage bearbeitet.',
    contactText: 'Teilen Sie Fracht, Ursprung, Ziel und gewünschten Zeitpunkt mit. Das Team kann dann den nächsten praktischen Schritt bestätigen.',
    callLabel: 'Direkt anrufen',
  },
}

type ServiceFaq = { question: string; answer: string }

export const SERVICE_EXTRA_FAQS: Record<'en' | 'de', Record<ServiceSlug, ServiceFaq[]>> = {
  en: {
    'air-freight': [
      { question: 'What affects an air freight estimate?', answer: 'The cargo description, size or weight, origin, destination and required timing all help us prepare the right estimate.' },
      { question: 'What should I share before requesting a quote?', answer: 'Start with the collection point, destination, cargo details and preferred timing. We will guide you through anything else needed for the route.' },
    ],
    'sea-freight': [
      { question: 'What affects the cost of sea freight?', answer: 'Volume, packing, origin, destination and the type of shipment all shape the estimate. Share as much detail as you have for a more useful quote.' },
      { question: 'How do I know whether container or consolidated cargo is right?', answer: 'The choice depends on the amount and form of your cargo. Our team will discuss the practical option once we understand the shipment.' },
    ],
    'vehicle-shipping': [
      { question: 'What information is needed for a vehicle shipping estimate?', answer: 'Vehicle type, make or model, collection point, destination and your preferred timing give us the right starting point.' },
      { question: 'When should I contact you about a vehicle?', answer: 'Contact us as soon as you know the vehicle and intended destination. This gives the team time to discuss the transport and paperwork path with you.' },
    ],
    'commercial-cargo': [
      { question: 'What should a business include in its first request?', answer: 'Share what is moving, where it starts and finishes, how it is packed, and whether the shipment is one-off or recurring.' },
      { question: 'Can the route change as business needs change?', answer: 'We review the shipment requirement with you and can discuss the most suitable next route as priorities, goods or destinations evolve.' },
    ],
    'personal-effects': [
      { question: 'What information helps you estimate a personal-effects shipment?', answer: 'An overview of the belongings, the collection and delivery locations, estimated number of pieces, and your intended timing are the best place to start.' },
      { question: 'Can you confirm destination requirements for my belongings?', answer: 'Requirements can vary by destination and shipment. Tell us where your belongings are going and we will explain the next steps for your route.' },
    ],
    'vehicle-sourcing': [
      { question: 'What should I share to begin a vehicle search?', answer: 'Tell us the preferred vehicle type or model, intended destination, budget or purchase priorities, and whether you will also need shipping.' },
      { question: 'Can I arrange shipping after the purchase is complete?', answer: 'Yes. We can connect the sourcing process to vehicle shipping when the vehicle is ready to move.' },
    ],
    storage: [
      { question: 'What information is needed to arrange storage?', answer: 'Tell us what needs to be stored, the approximate number of items or pallets, when storage should begin and whether there is an onward shipment.' },
      { question: 'How do I arrange release for onward shipping?', answer: 'When your next shipment is ready to plan, contact the team with the destination and timing so the next handover can be coordinated.' },
    ],
  },
  de: {
    'air-freight': [
      { question: 'Was beeinflusst ein Luftfrachtangebot?', answer: 'Frachtbeschreibung, Maße oder Gewicht, Ursprung, Ziel und gewünschter Zeitpunkt helfen uns, das passende Angebot vorzubereiten.' },
      { question: 'Was sollte ich vor einer Angebotsanfrage mitteilen?', answer: 'Beginnen Sie mit Abholort, Ziel, Frachtdetails und gewünschtem Zeitpunkt. Wir erklären Ihnen, was für die Route noch benötigt wird.' },
    ],
    'sea-freight': [
      { question: 'Was beeinflusst die Kosten der Seefracht?', answer: 'Volumen, Verpackung, Ursprung, Ziel und Sendungsart prägen das Angebot. Je mehr Details Sie teilen, desto hilfreicher wird die Einschätzung.' },
      { question: 'Woher weiß ich, ob Container oder Sammelfracht passt?', answer: 'Das hängt von Menge und Form Ihrer Fracht ab. Unser Team bespricht die praktische Option, sobald wir die Sendung verstehen.' },
    ],
    'vehicle-shipping': [
      { question: 'Welche Angaben brauche ich für ein Fahrzeugtransport-Angebot?', answer: 'Fahrzeugtyp, Marke oder Modell, Abholort, Ziel und gewünschter Zeitpunkt sind der richtige Anfang.' },
      { question: 'Wann sollte ich mich wegen eines Fahrzeugs melden?', answer: 'Melden Sie sich, sobald Fahrzeug und Ziel feststehen. So kann das Team Transport und Papierweg frühzeitig mit Ihnen besprechen.' },
    ],
    'commercial-cargo': [
      { question: 'Was sollte ein Unternehmen in der ersten Anfrage angeben?', answer: 'Teilen Sie mit, was bewegt wird, wo die Fracht startet und endet, wie sie verpackt ist und ob die Sendung einmalig oder wiederkehrend ist.' },
      { question: 'Kann sich die Route ändern, wenn sich Geschäftsanforderungen ändern?', answer: 'Wir prüfen die Anforderung mit Ihnen und können die passende nächste Route besprechen, wenn sich Prioritäten, Waren oder Ziele verändern.' },
    ],
    'personal-effects': [
      { question: 'Welche Angaben helfen bei einem Angebot für Umzugsgut?', answer: 'Ein Überblick über die Gegenstände, Abhol- und Lieferort, geschätzte Stückzahl und geplanter Zeitpunkt sind der beste Anfang.' },
      { question: 'Können Sie Anforderungen am Zielort bestätigen?', answer: 'Anforderungen können je nach Ziel und Sendung variieren. Sagen Sie uns, wohin Ihr Umzugsgut geht, und wir erklären die nächsten Schritte.' },
    ],
    'vehicle-sourcing': [
      { question: 'Was sollte ich für die Fahrzeugsuche mitteilen?', answer: 'Sagen Sie uns Fahrzeugtyp oder Modell, geplantes Ziel, Budget oder Kaufprioritäten und ob Sie auch Versand benötigen.' },
      { question: 'Kann ich den Versand erst nach dem Kauf organisieren?', answer: 'Ja. Wir können die Beschaffung mit Fahrzeugtransport verbinden, sobald das Fahrzeug bereit ist.' },
    ],
    storage: [
      { question: 'Welche Angaben brauche ich für eine Lageranfrage?', answer: 'Sagen Sie uns, was gelagert werden soll, die ungefähre Anzahl von Gegenständen oder Paletten, den Startzeitpunkt und ob ein Weitertransport folgt.' },
      { question: 'Wie organisiere ich die Freigabe für den Weitertransport?', answer: 'Sobald die nächste Sendung geplant werden kann, kontaktieren Sie unser Team mit Ziel und Zeitpunkt, damit die Übergabe koordiniert wird.' },
    ],
  },
}

type ServiceOperationalCopy = Pick<ServiceStory, 'fitTitle' | 'fit' | 'scenes' | 'prepareTitle' | 'faqTitle'>

export const SERVICE_OPERATIONAL_COPY: Record<'en' | 'de', Record<ServiceSlug, ServiceOperationalCopy>> = {
  en: {
    'air-freight': {
      fitTitle: 'Air freight for time-critical and high-value shipments.',
      fit: ['European airport departures to destinations in the DEexpress network', 'Priority consignments, smaller freight and high-value cargo', 'Coordination from collection and export documents through destination handover'],
      scenes: [
        { title: 'Shipment review', text: 'We start with the cargo, collection point, destination, dimensions or weight, and the date the shipment needs to move. These details establish whether air freight is the appropriate mode.' },
        { title: 'Booking and export preparation', text: 'Once the route is agreed, the shipment is prepared for collection and airport handling. DEexpress supports the export-document process and coordinates the handovers required before departure.' },
        { title: 'Arrival and onward coordination', text: 'At destination, the next handover is planned around the confirmed route. Where available, the service continues from airport handling to final delivery coordination.' },
      ],
      prepareTitle: 'Information needed for an air freight request.', faqTitle: 'Air freight FAQs.',
    },
    'sea-freight': {
      fitTitle: 'Sea freight for container, consolidated and bulky cargo.',
      fit: ['Container and consolidated shipments from European ports', 'Heavy, bulky or lower-urgency goods', 'Port-to-door coordination and documentation support'],
      scenes: [
        { title: 'Cargo and load planning', text: 'We review the cargo type, packing, volume and destination. This determines whether a container or consolidated shipment is the more practical starting point.' },
        { title: 'Collection, consolidation and port handling', text: 'Cargo is prepared for the relevant handovers before departure. The plan can include collection, consolidation, port handling and the documents needed for the shipment.' },
        { title: 'Destination handover', text: 'The sea journey is one part of the movement. DEexpress coordinates the destination handover and discusses onward delivery where it is available for the route.' },
      ],
      prepareTitle: 'Information needed for a sea freight request.', faqTitle: 'Sea freight FAQs.',
    },
    'vehicle-shipping': {
      fitTitle: 'International shipping for cars, trucks, buses and equipment.',
      fit: ['Vehicle collection and shipping from Europe', 'Container and RoRo options on applicable routes', 'Purchase and export paperwork support'],
      scenes: [
        { title: 'Vehicle and route review', text: 'We confirm the vehicle type, collection point, destination and purchase status. These details shape the available transport and handover options.' },
        { title: 'Transport preparation', text: 'The vehicle is prepared for the agreed shipping method. Where relevant, DEexpress coordinates purchase and export paperwork support alongside the transport plan.' },
        { title: 'Shipment and destination handover', text: 'The vehicle moves on the agreed route, with the destination handover coordinated as part of the overall shipment process.' },
      ],
      prepareTitle: 'Information needed for a vehicle shipping request.', faqTitle: 'Vehicle shipping FAQs.',
    },
    'commercial-cargo': {
      fitTitle: 'Commercial cargo for one-off and recurring business shipments.',
      fit: ['Palletised and loose commercial goods', 'Air, sea and land options based on the shipment requirement', 'Documentation support for business cargo'],
      scenes: [
        { title: 'Requirement and route review', text: 'We begin with the goods, packing format, shipment frequency, origin and destination. This gives the team the information needed to assess the appropriate mode and route.' },
        { title: 'Shipment coordination', text: 'The agreed plan brings collection, handling and the selected transport mode together. Documentation support is coordinated around the cargo and destination.' },
        { title: 'Repeat or one-off handover', text: 'For recurring cargo, the same information can form the basis of later requests. For one-off movements, the destination handover is coordinated around the confirmed shipment plan.' },
      ],
      prepareTitle: 'Information needed for a commercial cargo request.', faqTitle: 'Commercial cargo FAQs.',
    },
    'personal-effects': {
      fitTitle: 'Personal effects shipping for boxes, luggage and household goods.',
      fit: ['Private shipments from Europe to the DEexpress network', 'Boxes, luggage and household items', 'Guidance for collection, packing and onward shipping'],
      scenes: [
        { title: 'Item and destination review', text: 'We start with what is being moved, where it is collected and where it is going. An approximate number of boxes or pieces helps us understand the shipment size.' },
        { title: 'Preparation and collection', text: 'DEexpress gives practical guidance on preparing personal items for shipment or storage, then coordinates the collection and next transport handover.' },
        { title: 'Shipment and delivery coordination', text: 'The route is planned around the confirmed destination. The team remains the point of contact while the shipment moves through its handovers.' },
      ],
      prepareTitle: 'Information needed for a personal-effects request.', faqTitle: 'Personal effects FAQs.',
    },
    'vehicle-sourcing': {
      fitTitle: 'Vehicle sourcing in Europe, connected to international shipping.',
      fit: ['Vehicle search across Europe', 'Purchase, negotiation, inspection and paperwork support', 'A direct handover from sourcing to vehicle shipping'],
      scenes: [
        { title: 'Vehicle brief', text: 'The process begins with the vehicle type, preferred make or model, intended destination and the priorities for the purchase. This provides the brief for the search.' },
        { title: 'Search and purchase support', text: 'DEexpress assists with identifying vehicles and supporting inspection, negotiation, purchase and paperwork steps as required.' },
        { title: 'Shipping handover', text: 'When the vehicle is ready, the sourcing process can continue directly into international vehicle shipping, without separating the purchase from the transport plan.' },
      ],
      prepareTitle: 'Information needed to start a vehicle search.', faqTitle: 'Vehicle sourcing FAQs.',
    },
    storage: {
      fitTitle: 'Berlin storage and warehousing before the next shipment stage.',
      fit: ['Short- and long-term storage in Berlin', 'Retail and private goods', 'Storage connected to a planned onward shipment'],
      scenes: [
        { title: 'Storage requirement review', text: 'We establish what needs to be stored, the quantity of items or pallets, when storage begins and whether the goods are expected to move onward.' },
        { title: 'Warehouse handover', text: 'Goods are received into the Berlin storage plan with the information needed to keep them connected to the next shipping decision.' },
        { title: 'Release for onward transport', text: 'When the next route is confirmed, the stored goods can be prepared for the appropriate handover into sea freight, personal effects shipping or another DEexpress service.' },
      ],
      prepareTitle: 'Information needed for a storage request.', faqTitle: 'Storage FAQs.',
    },
  },
  de: {
    'air-freight': { fitTitle: 'Luftfracht für zeitkritische und hochwertige Sendungen.', fit: ['Abflüge von europäischen Flughäfen zu Zielen im DEexpress-Netzwerk', 'Prioritäre Sendungen, kleinere Fracht und hochwertige Güter', 'Koordination von Abholung und Exportdokumenten bis zur Übergabe am Ziel'], scenes: [{ title: 'Prüfung der Sendung', text: 'Wir beginnen mit Fracht, Abholort, Ziel, Maßen oder Gewicht und dem gewünschten Versanddatum. Diese Angaben zeigen, ob Luftfracht die passende Transportart ist.' }, { title: 'Buchung und Exportvorbereitung', text: 'Nach der Routenabstimmung wird die Sendung für Abholung und Flughafenabwicklung vorbereitet. DEexpress unterstützt bei Exportdokumenten und koordiniert die Übergaben vor Abflug.' }, { title: 'Ankunft und Weiterkoordination', text: 'Am Ziel wird die nächste Übergabe nach der bestätigten Route geplant. Wo verfügbar, kann die Koordination von der Flughafenabwicklung bis zur Zustellung reichen.' }], prepareTitle: 'Angaben für eine Luftfrachtanfrage.', faqTitle: 'Häufige Fragen zur Luftfracht.' },
    'sea-freight': { fitTitle: 'Seefracht für Container, Sammelladungen und sperrige Güter.', fit: ['Container- und Sammelsendungen aus europäischen Häfen', 'Schwere, sperrige oder weniger zeitkritische Güter', 'Koordination vom Hafen bis zur Tür und Dokumentenunterstützung'], scenes: [{ title: 'Prüfung von Fracht und Ladung', text: 'Wir prüfen Frachtart, Verpackung, Volumen und Ziel. So lässt sich entscheiden, ob Container oder Sammelladung der praktischere Ausgangspunkt ist.' }, { title: 'Abholung, Konsolidierung und Hafenabwicklung', text: 'Die Fracht wird für die relevanten Übergaben vor Abfahrt vorbereitet. Der Plan kann Abholung, Konsolidierung, Hafenabwicklung und benötigte Dokumente umfassen.' }, { title: 'Übergabe am Ziel', text: 'Die Seereise ist ein Teil der Bewegung. DEexpress koordiniert die Übergabe am Ziel und bespricht Weiterlieferung, wo sie für die Route verfügbar ist.' }], prepareTitle: 'Angaben für eine Seefrachtanfrage.', faqTitle: 'Häufige Fragen zur Seefracht.' },
    'vehicle-shipping': { fitTitle: 'Internationaler Versand für Pkw, Lkw, Busse und Ausrüstung.', fit: ['Fahrzeugabholung und Versand aus Europa', 'Container- und RoRo-Optionen auf passenden Routen', 'Unterstützung bei Kauf- und Exportpapieren'], scenes: [{ title: 'Prüfung von Fahrzeug und Route', text: 'Wir bestätigen Fahrzeugtyp, Abholort, Ziel und Kaufstatus. Diese Angaben bestimmen die verfügbaren Transport- und Übergabeoptionen.' }, { title: 'Transportvorbereitung', text: 'Das Fahrzeug wird für die vereinbarte Versandart vorbereitet. Wo relevant, koordiniert DEexpress Unterstützung bei Kauf- und Exportpapieren parallel zum Transportplan.' }, { title: 'Versand und Übergabe am Ziel', text: 'Das Fahrzeug wird auf der vereinbarten Route bewegt; die Übergabe am Ziel ist Teil des gesamten Versandprozesses.' }], prepareTitle: 'Angaben für eine Fahrzeugtransportanfrage.', faqTitle: 'Häufige Fragen zum Fahrzeugtransport.' },
    'commercial-cargo': { fitTitle: 'Kommerzielle Fracht für einmalige und wiederkehrende Geschäftssendungen.', fit: ['Palettierte und lose Handelswaren', 'Luft-, See- und Landoptionen nach Anforderung', 'Dokumentenunterstützung für gewerbliche Fracht'], scenes: [{ title: 'Prüfung von Anforderung und Route', text: 'Wir beginnen mit Ware, Verpackungsform, Versandhäufigkeit, Ursprung und Ziel. So kann das Team die passende Transportart und Route einschätzen.' }, { title: 'Sendungskoordination', text: 'Der vereinbarte Plan verbindet Abholung, Abwicklung und die gewählte Transportart. Dokumentenunterstützung wird nach Fracht und Ziel koordiniert.' }, { title: 'Wiederkehrende oder einmalige Übergabe', text: 'Bei wiederkehrender Fracht können dieselben Angaben spätere Anfragen unterstützen. Bei Einzelbewegungen wird die Zielübergabe nach dem bestätigten Plan koordiniert.' }], prepareTitle: 'Angaben für eine Anfrage zu kommerzieller Fracht.', faqTitle: 'Häufige Fragen zu kommerzieller Fracht.' },
    'personal-effects': { fitTitle: 'Versand persönlicher Gegenstände für Kartons, Gepäck und Hausrat.', fit: ['Private Sendungen aus Europa ins DEexpress-Netzwerk', 'Kartons, Gepäck und Haushaltsgegenstände', 'Begleitung bei Abholung, Verpackung und Weitertransport'], scenes: [{ title: 'Prüfung von Gegenständen und Ziel', text: 'Wir beginnen mit den Gegenständen, Abholort und Ziel. Eine ungefähre Anzahl von Kartons oder Stücken hilft uns, die Sendungsgröße zu verstehen.' }, { title: 'Vorbereitung und Abholung', text: 'DEexpress gibt praktische Hinweise zur Vorbereitung persönlicher Gegenstände für Versand oder Lagerung und koordiniert dann Abholung und nächste Übergabe.' }, { title: 'Versand und Lieferkoordination', text: 'Die Route wird nach dem bestätigten Ziel geplant. Das Team bleibt Ihr Ansprechpartner, während die Sendung ihre Übergaben durchläuft.' }], prepareTitle: 'Angaben für eine Anfrage zu persönlichen Gegenständen.', faqTitle: 'Häufige Fragen zu persönlichen Gegenständen.' },
    'vehicle-sourcing': { fitTitle: 'Fahrzeugbeschaffung in Europa mit Anschluss an internationalen Versand.', fit: ['Fahrzeugsuche in ganz Europa', 'Unterstützung bei Kauf, Verhandlung, Prüfung und Papieren', 'Direkte Übergabe von Beschaffung zu Fahrzeugtransport'], scenes: [{ title: 'Fahrzeugbriefing', text: 'Der Prozess beginnt mit Fahrzeugtyp, Marke oder Modell, geplantem Ziel und Kaufprioritäten. Das bildet die Grundlage für die Suche.' }, { title: 'Suche und Kaufunterstützung', text: 'DEexpress unterstützt bei der Identifikation von Fahrzeugen sowie bei Prüfung, Verhandlung, Kauf und Papierarbeit nach Bedarf.' }, { title: 'Übergabe an den Versand', text: 'Wenn das Fahrzeug bereit ist, kann die Beschaffung direkt in den internationalen Versand übergehen, ohne Kauf und Transportplan zu trennen.' }], prepareTitle: 'Angaben für den Start einer Fahrzeugsuche.', faqTitle: 'Häufige Fragen zur Fahrzeugbeschaffung.' },
    storage: { fitTitle: 'Lagerung und Warehousing in Berlin vor der nächsten Versandphase.', fit: ['Kurz- und langfristige Lagerung in Berlin', 'Handels- und Privatgüter', 'Lagerung mit Anschluss an einen geplanten Weitertransport'], scenes: [{ title: 'Prüfung des Lagerbedarfs', text: 'Wir klären, was gelagert werden soll, die Menge an Gegenständen oder Paletten, den Startzeitpunkt und ob die Güter weitertransportiert werden sollen.' }, { title: 'Übergabe an das Lager', text: 'Die Güter werden in den Berliner Lagerplan übernommen und bleiben mit der nächsten Versandentscheidung verbunden.' }, { title: 'Freigabe für den Weitertransport', text: 'Wenn die nächste Route bestätigt ist, können die gelagerten Güter für die passende Übergabe in Seefracht, Umzugsgutversand oder einen anderen DEexpress-Service vorbereitet werden.' }], prepareTitle: 'Angaben für eine Lageranfrage.', faqTitle: 'Häufige Fragen zur Lagerung.' },
  },
}
