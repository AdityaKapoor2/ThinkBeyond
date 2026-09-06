/* ============================================================
   BHARATAM — REACTIVE PLAYER STATE ENGINE (state.js)
   Fully dynamic state store managing player growth, currency,
   journey progression, quests, paths, and recent unlocks.
   ============================================================ */

(function () {
  const STORAGE_KEY = 'bharatam_player_state_v1';

  const defaultState = {
    user: {
      name: 'Anveshak',
      title: 'Seeker of Knowledge',
      level: 15,
      xp: 620,
      nextLevelXp: 1000,
      avatar: 'avatar-anveshak'
    },
    currencies: {
      coins: 1250,
      gems: 340,
      shards: 18
    },
    streak: {
      days: 7,
      keepItUpText: 'Keep it up!',
      lastClaimedDate: new Date().toISOString().split('T')[0]
    },
    activeJourney: {
      era: 'TRETA YUGA',
      chapter: 'The Exile Begins',
      description: 'Journey alongside Shri Rama, Sita, and Lakshmana as they step into the sacred Dandakaranya forest.',
      progress: 60,
      stage: 3,
      totalStages: 5
    },
    dailyQuest: {
      id: 'quest_timeline_events',
      title: 'Daily Quest',
      description: 'Complete 2 events from any timeline',
      current: 1,
      target: 2,
      reward: 50,
      claimed: false
    },
    selectedReligiousPathId: 'hindu_traditions',
    ramayanaTimeline: {
      era: 'Treta Yuga',
      title: 'The Story of Ramayana',
      subtitle: 'Dharma • Bhakti • Victory',
      events: [
        {
          id: 'birth_of_rama',
          order: 1,
          title: 'Birth of Rama',
          location: 'Ayodhya',
          region: 'Kosala Kingdom, Banks of River Sarayu (Uttar Pradesh)',
          kanda: 'Bala Kanda',
          status: 'completed',
          badgeType: 'completed',
          coords: { left: 11.23, top: 34.17 },
          image: 'assets/ramayana_nodes/birth_of_rama.png',
          subtitle: 'The Descent of Dharma (Maryada Purushottama)',
          shlokaDevanagari: 'कौसल्याऽजनयद् रामं दिव्यलक्षणसंयुतम् । विष्णोरर्धं महाभागं पुत्रमैक्ष्वाकुवर्धनम् ॥',
          shlokaTransliteration: 'kausalyā janayad rāmaṁ divya-lakṣaṇa-saṁyutam | viṣṇor ardhaṁ mahā-bhāgaṁ putram aikṣvāku-vardhanam ||',
          shlokaMeaning: 'Queen Kaushalya gave birth to Sri Rama, endowed with divine auspicious qualities and supreme grace, an incarnation born to elevate the solar dynasty of Ikshvaku.',
          audioText: 'Kausalya janayad Ramam divya lakshana samyutam. Vishnor ardham maha bhagam putram aikshvaku vardhanam.',
          story: [
            'In the illustrious kingdom of Kosala on the tranquil banks of the river Sarayu stood the magnificent city of Ayodhya. King Dasharatha, despite his immense virtue, valor, and righteous rule, grieved that he had no heir to continue the Ikshvaku lineage.',
            'Under the guidance of Sage Vasishtha, King Dasharatha invited Sage Rishyashringa to conduct the sacred Putrakameshti Yajna. From the blazing sacrificial fire arose a resplendent divine being holding a golden vessel containing celestial Payasam. Dasharatha distributed this divine nectar to his three queens—Kaushalya, Kaikeyi, and Sumitra.',
            'On the auspicious ninth day of the waxing moon in the month of Chaitra (celebrated worldwide as Rama Navami), Queen Kaushalya gave birth to Lord Rama. Soon, Bharata was born to Kaikeyi, and the twins Lakshmana and Shatrughna to Sumitra. From early boyhood, Rama manifested Maryada—the embodiment of righteousness, truth, and profound compassion for all beings.'
          ],
          characters: [
            { name: 'Lord Rama', role: 'Avatara of Vishnu', desc: 'The eldest prince of Ayodhya, embodiment of virtue, truth, and dharma.' },
            { name: 'King Dasharatha', role: 'King of Kosala', desc: 'Righteous monarch of the Solar dynasty and loving father.' },
            { name: 'Queen Kaushalya', role: 'Mother of Rama', desc: 'Venerable chief queen renowned for humility, patience, and devotion.' },
            { name: 'Sage Vasishtha', role: 'Kula Guru', desc: 'Venerated Vedic sage and spiritual master of the royal house of Ikshvaku.' }
          ],
          sacredGeography: {
            place: 'Ayodhya (Kosala Kingdom)',
            modernName: 'Ayodhya, Uttar Pradesh, India',
            significance: 'One of the Sapta Puris (seven sacred liberation cities) situated along the sacred waters of River Sarayu.'
          },
          dharmaLesson: 'True leadership is rooted in humility, devotion, and an unshakeable commitment to universal welfare.',
          quiz: {
            question: 'Which sacred Vedic yajna was performed by King Dasharatha to receive the blessing of divine sons?',
            options: [
              { text: 'Ashvamedha Yajna', correct: false },
              { text: 'Putrakameshti Yajna', correct: true },
              { text: 'Rajasuya Yajna', correct: false },
              { text: 'Soma Yajna', correct: false }
            ],
            explanation: 'Sage Rishyashringa performed the Putrakameshti Yajna, from whose sacred fire a divine emissary gave the golden vessel of Payasam.',
            rewardXp: 150,
            rewardCoins: 50,
            relicName: 'Golden Payasam Vessel of Ayodhya'
          }
        },
        {
          id: 'swayamvara',
          order: 2,
          title: 'Swayamvara & Marriage',
          location: 'Mithila',
          region: 'Videha Kingdom, Janakpur (Mithila)',
          kanda: 'Bala Kanda',
          status: 'completed',
          badgeType: 'completed',
          coords: { left: 27.64, top: 29.83 },
          image: 'assets/ramayana_nodes/swayamvara.png',
          subtitle: 'The Stringing of Lord Shiva’s Pinaka Bow',
          shlokaDevanagari: 'गृहीत्वा धनुषो मध्यं पूरयामास वीर्यवान् । तद् बभञ्ज धनुर्मध्ये नरश्रेष्ठो महायशाः ॥',
          shlokaTransliteration: 'gṛhītvā dhanuṣo madhyaṁ pūrayāmāsa vīryavān | tad babhañja dhanur-madhye nara-śreṣṭho mahā-yaśāḥ ||',
          shlokaMeaning: 'Holding the center of the celestial Pinaka bow, the illustrious Rama strung it with effortless grace; under his divine might, the bow snapped in two with a sound like thunder.',
          audioText: 'Grihitva dhanusho madhyam poorayamasa veeryavan. Tad babhanja dhanur madhye nara shreshtho maha yashah.',
          story: [
            'Sage Vishvamitra escorted the young princes Rama and Lakshmana to the capital of Videha, the golden city of Mithila ruled by King Janaka. King Janaka possessed the mighty celestial bow Pinaka, bequeathed centuries prior by Lord Shiva.',
            'Janaka had declared a solemn vow: only the warrior who could lift, bend, and string this cosmic bow would wed his divine daughter, Devi Sita (Janaki), who had manifested miraculously from the furrow of the earth during a sacred ploughing ceremony.',
            'Scores of proud kings, demigods, and warriors had tried and failed to even nudge the massive bow. When Sage Vishvamitra nodded, Sri Rama stepped forward serenely. With radiant calmness, he grasped the bow with one hand, raised it effortlessly, and strung the bowstring. As he drew it back, the bow fractured in two with a cosmic resonance that echoed across the heavens. Flowers showered from celestial realms as Sita placed the fragrant Varmala (garland of victory) around Rama’s neck.'
          ],
          characters: [
            { name: 'Devi Sita', role: 'Princess of Mithila', desc: 'Daughter of the earth, avatar of Goddess Lakshmi, embodying purity and courage.' },
            { name: 'Sri Rama', role: 'Heroic Archer', desc: 'The scion of Raghu whose divine composure mastered the Pinaka bow.' },
            { name: 'King Janaka', role: 'Rajarshi of Mithila', desc: 'Philosopher-king celebrated in the Upanishads for detached spiritual wisdom.' },
            { name: 'Sage Vishvamitra', role: 'Sage Mentor', desc: 'Mighty Brahmarshi who guided Rama into spiritual mastery and battle readiness.' }
          ],
          sacredGeography: {
            place: 'Janakpur Dham (Mithila)',
            modernName: 'Janakpur, Nepal & Mithila Region, Bihar',
            significance: 'Ancient capital of Videha kingdom where the divine wedding Vivaha Panchami is celebrated to this day.'
          },
          dharmaLesson: 'True valor does not announce itself with pride; it is revealed through silent poise, virtue, and readiness to serve.',
          quiz: {
            question: 'What was the name of the cosmic bow of Lord Shiva that Lord Rama strung in King Janaka’s court?',
            options: [
              { text: 'Gandiva', correct: false },
              { text: 'Pinaka', correct: true },
              { text: 'Sharanga', correct: false },
              { text: 'Vijaya', correct: false }
            ],
            explanation: 'The sacred bow of Lord Shiva kept in Mithila was named Pinaka, which required extraordinary spiritual purity and strength to string.',
            rewardXp: 160,
            rewardCoins: 55,
            relicName: 'Fragment of the Celestial Pinaka Bow'
          }
        },
        {
          id: 'exile_begins',
          order: 3,
          title: 'Exile Begins',
          location: 'Ayodhya',
          region: 'Ayodhya to Sringaverapura (Banks of Ganga)',
          kanda: 'Ayodhya Kanda',
          status: 'in_progress',
          badgeType: 'in_progress',
          coords: { left: 33.11, top: 52.17 },
          image: 'assets/ramayana_nodes/exile_begins.png',
          subtitle: 'The Vow of Truth and the Parting of Ayodhya',
          shlokaDevanagari: 'न चाधर्मेण नोत्सहे जीवितुं भरताग्रजः । धर्ममेवाचरिष्यामि वनं गच्छामि राघव ॥',
          shlokaTransliteration: 'na cā-dharmeṇa notsahe jīvituṁ bharatā-grajaḥ | dharmam evā-cariṣyāmi vanaṁ gacchāmi rāghava ||',
          shlokaMeaning: 'I have no desire to sustain life through unrighteousness. Walking firmly on the path of Dharma, I shall honor my father’s pledged word and depart for the forest.',
          audioText: 'Na cha dharmena notsahe jeevitum bharatagrajah. Dharmam eva charishyami vanam gacchami Raghava.',
          story: [
            'As Ayodhya rejoiced at the news of Rama’s upcoming coronation as Yuvaraja (crown prince), the poisonous words of maidservant Manthara poisoned the mind of Queen Kaikeyi with jealousy and insecurity regarding Bharata’s future.',
            'Kaikeyi retreated to the sorrow chamber (Krodha Bhavana) and invoked two boons promised by King Dasharatha during ancient battles: that Bharata be crowned king, and that Rama be exiled to the Dandaka forest for fourteen long years.',
            'When informed, Lord Rama showed neither despair nor resentment. Smiling gently, he bowed to his grieving father and stepmother Kaikeyi, declaring that honoring a father’s vow was the supreme duty. Though Rama urged Sita and Lakshmana to stay in the palace, both adamantly insisted on accompanying him. Ayodhya wept as the three divine souls donned bark garments (valkala) and walked out of the golden gates into exile.'
          ],
          characters: [
            { name: 'Queen Kaikeyi', role: 'Mother of Bharata', desc: 'Queen swayed by insecurity who demanded the fourteen-year exile.' },
            { name: 'Lakshmana', role: 'Devoted Brother', desc: 'Rama’s valiant sibling who renounced princely comforts to safeguard him in the wilderness.' },
            { name: 'Guha', role: 'Nishada King', desc: 'Tribal chieftain of Sringaverapura who lovingly ferried Rama across the holy Ganga.' },
            { name: 'Sumantra', role: 'Charioteer & Minister', desc: 'Loyal royal charioteer who escorted the divine trio to the forest boundary.' }
          ],
          sacredGeography: {
            place: 'Sringaverapura & Tamasa River',
            modernName: 'Singraur near Prayagraj, Uttar Pradesh',
            significance: 'The boundary where Rama shed his royal chariot, embraced Guha the Nishada chieftain, and crossed the holy Ganga on foot.'
          },
          dharmaLesson: 'Satya (truth) and filial devotion are tested in adversity; true character shines brightest when relinquishing worldly prestige.',
          quiz: {
            question: 'For how many years was Lord Rama asked to dwell in the forest in exile?',
            options: [
              { text: '12 years', correct: false },
              { text: '14 years', correct: true },
              { text: '10 years', correct: false },
              { text: '7 years', correct: false }
            ],
            explanation: 'Queen Kaikeyi asked for Rama to be exiled to the Dandaka forest for 14 years so Bharata could establish his rule.',
            rewardXp: 170,
            rewardCoins: 60,
            relicName: 'Hermit Valkala Bark Robe'
          }
        },
        {
          id: 'exile_forest',
          order: 4,
          title: 'Exile to Forest',
          location: 'Dandaka',
          region: 'Dandakaranya & Panchavati (Nashik, Maharashtra)',
          kanda: 'Aranya Kanda',
          status: 'available',
          badgeType: 'available',
          coords: { left: 45.21, top: 35.5 },
          image: 'assets/ramayana_nodes/exile_forest.png',
          subtitle: 'The Hermitage on the Sacred River Godavari',
          shlokaDevanagari: 'ततो गोदावरीं रम्यां गत्वा वैदेहि संवृताः । आश्रमं रोचयन् वीराः पञ्चवट्यां महावने ॥',
          shlokaTransliteration: 'tato godāvarīṁ ramyāṁ gatvā vaidehi-saṁvṛtāḥ | āśramaṁ rocayan vīrāḥ pañcavaṭyāṁ mahā-vane ||',
          shlokaMeaning: 'Reaching the beautiful banks of River Godavari accompanied by Sita, the heroic princes built a tranquil hermitage amidst the five sacred banyan trees of Panchavati.',
          audioText: 'Tato Godavarim ramyam gatva vaidehi samvritah. Aashramam rochayan veerah panchavatyam maha vane.',
          story: [
            'Venturing deeper into the wilderness, Rama, Sita, and Lakshmana arrived in the dense Dandakaranya forest. Ascetic hermits and rishis gathered around Rama, pleading for protection from marauding demons who desecrated their sacred yajnas and peaceful ashrams.',
            'Rama took a solemn vow to rid the forest of negative forces. The divine trio visited the hermitages of Sage Bharadwaja, Sage Atri, and venerable Anasuya, who gifted Devi Sita divine celestial garments that would never soil or age.',
            'Under the direction of the revered Sage Agastya, Lakshmana built a picturesque cottage at Panchavati on the banks of the sacred Godavari River under five auspicious banyan trees. Here they lived in serene harmony with nature, befriending Jatayu, the mighty eagle king of the skies.'
          ],
          characters: [
            { name: 'Sage Agastya', role: 'Venerated Rishi', desc: 'Cosmic seer who bestowed divine celestial weapons and armor upon Rama.' },
            { name: 'Mata Anasuya', role: 'Ascetic Mother', desc: 'Embodiment of devotion who gifted Sita celestial garments and spiritual jewels.' },
            { name: 'Jatayu', role: 'Eagle King', desc: 'Noble, loyal friend of King Dasharatha who guarded the hermitage skies.' },
            { name: 'Lakshmana', role: 'Guardian & Architect', desc: 'Faithful brother who crafted the thatched hut with devotion at Panchavati.' }
          ],
          sacredGeography: {
            place: 'Panchavati (Dandakaranya)',
            modernName: 'Nashik, Maharashtra along Godavari River',
            significance: 'Site of the five sacred banyan trees (Panch Vriksha) and Sita Gufa cave where the trio dwelled.'
          },
          dharmaLesson: 'Living in harmony with nature and defending innocent spiritual practitioners is a sacred duty of righteousness.',
          quiz: {
            question: 'On the banks of which sacred southern river did Lakshmana construct the hermitage at Panchavati?',
            options: [
              { text: 'Yamuna River', correct: false },
              { text: 'Godavari River', correct: true },
              { text: 'Narmada River', correct: false },
              { text: 'Kaveri River', correct: false }
            ],
            explanation: 'Panchavati was situated on the tranquil banks of the sacred Godavari River in the Dandakaranya forest near modern Nashik.',
            rewardXp: 180,
            rewardCoins: 65,
            relicName: 'Sacred Kusha Grass Hermitage Seal'
          }
        },
        {
          id: 'sita_abduction',
          order: 5,
          title: "Sita's Abduction",
          location: 'Lanka',
          region: 'Panchavati to Ashok Vatika, Sri Lanka',
          kanda: 'Aranya Kanda',
          status: 'available',
          badgeType: 'available',
          coords: { left: 62.5, top: 33.83 },
          image: 'assets/ramayana_nodes/sita_abduction.png',
          subtitle: 'The Illusion of the Golden Deer and Ravana’s Treachery',
          shlokaDevanagari: 'हा राम हा लक्ष्मण इति क्रन्दमाना वने शुभा । रक्षसा नीयमाना सा विक्रोशन्ती भृशं रुदन् ॥',
          shlokaTransliteration: 'hā rāma hā lakṣmaṇa iti krandamānā vane śubhā | rakṣasā nīyamānā sā vikrośantī bhṛśaṁ rudan ||',
          shlokaMeaning: 'Crying out desperately "O Rama! O Lakshmana!", the pure Sita wept as she was abducted through the sky by the ten-headed demon king.',
          audioText: 'Ha Rama ha Lakshmana iti krandamāna vane shubha. Rakshasa neeyamana sa vikroshanti bhrisham rudan.',
          story: [
            'Enraged by the humiliation of his sister Shurpanakha and his commanders Khara and Dushana, Ravana plotted revenge. He forced his uncle Maricha to assume the enchanting disguise of a golden deer with silver spots and emerald horns.',
            'Enchanted by the golden deer, Sita requested Rama to capture it gently. Scenting demonic illusion, Rama pursued the deer, leaving Lakshmana to guard the hermitage. When Rama shot Maricha with an arrow, the demon mimicked Rama’s voice in agony: "Ah Sita! Ah Lakshmana!"',
            'Distraught, Sita urged Lakshmana to rush to his brother’s aid. Lakshmana drew the protective Lakshman Rekha around the cottage, urging Sita not to step beyond it. Ravana appeared disguised as a starving wandering Brahmin monk begging for alms. Tricking Sita into stepping past the sacred line, Ravana revealed his ten-headed form and whisked her into his flying chariot. The aged eagle king Jatayu valiantly fought Ravana in mid-air until his wings were severed, sacrificing his life in the line of duty.'
          ],
          characters: [
            { name: 'Ravana', role: 'King of Lanka', desc: 'Mighty ten-headed Rakshasa king blinded by ego, lust, and arrogance.' },
            { name: 'Maricha', role: 'Sorcerer Demon', desc: 'Ravana’s uncle who assumed the optical mirage of the golden deer.' },
            { name: 'Jatayu', role: 'Martyr of Dharma', desc: 'Heroic avian king who gave his life attempting to rescue Devi Sita.' },
            { name: 'Devi Sita', role: 'Captive of Lanka', desc: 'Steadfast queen who retained divine dignity amidst captive confinement in Ashok Vatika.' }
          ],
          sacredGeography: {
            place: 'Lepakshi & Ashok Vatika',
            modernName: 'Lepakshi (Andhra Pradesh) & Hakgala Botanical Garden (Nuwara Eliya, Sri Lanka)',
            significance: 'Lepakshi is where Jatayu fell and received liberation from Lord Rama ("Le Pakshi" - Rise, O Bird).'
          },
          dharmaLesson: 'Illusions and greed deceive the senses; boundary lines of wisdom must never be breached under emotional impulse.',
          quiz: {
            question: 'Which demon transformed into the deceptive golden deer to lure Lord Rama away from the hermitage?',
            options: [
              { text: 'Subahu', correct: false },
              { text: 'Maricha', correct: true },
              { text: 'Kabandha', correct: false },
              { text: 'Trishira', correct: false }
            ],
            explanation: 'Maricha transformed himself into the alluring golden deer (Mayamriga) under Ravana’s coercion.',
            rewardXp: 190,
            rewardCoins: 70,
            relicName: 'Golden Feather of the Heroic Jatayu'
          }
        },
        {
          id: 'hanuman_journey',
          order: 6,
          title: "Hanuman's Journey",
          location: 'Lanka',
          region: 'Kishkindha (Hampi) across Ocean to Lanka',
          kanda: 'Sundara Kanda',
          status: 'available',
          badgeType: 'available',
          coords: { left: 80.37, top: 36.67 },
          image: 'assets/ramayana_nodes/hanuman_journey.png',
          subtitle: 'The Ocean Leap and the Beacon of Sundara Kanda',
          shlokaDevanagari: 'यथा राघोः कुलोद्भूतः साहाय्यं वो विधास्यति । तथाहं सागरं तीर्त्वा दृष्ट्वा द्रक्ष्यामि जानकीम् ॥',
          shlokaTransliteration: 'yathā rāghoḥ kulodbhūtaḥ sāhāyyaṁ vo vidhāsyati | tathāhaṁ sāgaraṁ tīrtvā dṛṣṭvā drakṣyāmi jānakīm ||',
          shlokaMeaning: 'Just as the scion of the Raghu dynasty brings grace to all, so shall I leap across the surging ocean, behold Mother Sita, and return with triumph.',
          audioText: 'Yatha Raghoh kulodbhootah sahayyam vo vidhasyati. Tathaham sagaram teertva drishtva drakshyami Janakim.',
          story: [
            'In search of Sita, Rama and Lakshmana arrived in the monkey kingdom of Kishkindha. Rama befriended Sugriva, deposed the tyrannical Vali, and crowned Sugriva king. In gratitude, Sugriva dispatched vast Vanara armies across all cardinal directions.',
            'The southern expedition stood on the shores of the vast ocean, despairing at the 100-yojana water barrier. The wise elder Jambavan approached Hanuman, reminding the humble son of the Wind God of his immense dormant powers and celestial boons.',
            'With a thunderous roar of "Jai Sri Rama!", Hanuman expanded into a cosmic form on Mount Mahendra and launched himself across the skies. Overcoming winged sea demons and serpent illusions, Hanuman landed in Lanka, located Sita in the Ashoka garden, presented Rama’s royal signet ring (Mudra), burned Lanka with his blazing tail to shatter Ravana’s illusion of invulnerability, and returned with the beacon message: "Drishtha Sita!" (Sita has been seen!).'
          ],
          characters: [
            { name: 'Lord Hanuman', role: 'Son of Vayu', desc: 'The supreme devotee, scholar of grammar, and invincible warrior of devotion.' },
            { name: 'Jambavan', role: 'King of Bears', desc: 'Venerated elder advisor who awakened Hanuman’s hidden divine faculties.' },
            { name: 'Sugriva', role: 'King of Kishkindha', desc: 'Monarch of the Vanaras whose massive search force spanned the globe.' },
            { name: 'Trijata', role: 'Righteous Rakshasi', desc: 'Compassionate guardian who comforted Mother Sita in captivity.' }
          ],
          sacredGeography: {
            place: 'Kishkindha & Mount Mahendragiri',
            modernName: 'Hampi, Karnataka & Tamil Nadu Coastline',
            significance: 'Anjanadri Hill in Hampi is celebrated as the sacred birthplace of Lord Hanuman.'
          },
          dharmaLesson: 'Devotion without ego unleashes infinite potential; true strength is realized in selflessly serving a higher cause.',
          quiz: {
            question: 'Who reminded Lord Hanuman of his boundless divine powers when the Vanaras faced the vast ocean barrier?',
            options: [
              { text: 'Angada', correct: false },
              { text: 'Jambavan', correct: true },
              { text: 'Nila', correct: false },
              { text: 'Sugriva', correct: false }
            ],
            explanation: 'The wise bear-king Jambavan awakened Hanuman to his divine birthright and boundless strength.',
            rewardXp: 200,
            rewardCoins: 75,
            relicName: 'Royal Signet Ring of Sri Rama (Mudra)'
          }
        },
        {
          id: 'bridge_to_lanka',
          order: 7,
          title: 'Bridge to Lanka',
          location: 'Setu Bandha',
          region: 'Dhanushkodi / Rameshwaram to Mannar Island',
          kanda: 'Yuddha Kanda',
          status: 'available',
          badgeType: 'available',
          coords: { left: 89.65, top: 55.83 },
          image: 'assets/ramayana_nodes/bridge_to_lanka.png',
          subtitle: 'Engineering the Wonder of Rama Setu',
          shlokaDevanagari: 'नलाय च ददौ सेतुं वानराणां महाबलः । स बबन्ध महासेतुं सागरे मकरालये ॥',
          shlokaTransliteration: 'nalāya ca dadau setuṁ vānarāṇāṁ mahā-balaḥ | sa babandha mahā-setuṁ sāgare makarālaye ||',
          shlokaMeaning: 'The mighty builder Nala took command of the causeway construction, raising a grand stone bridge across the surging ocean teeming with sea giants.',
          audioText: 'Nalaya cha dadau setum vanaranam maha balah. Sa babandha maha setum sagare makaralaye.',
          story: [
            'Arriving at the southern tip of the Indian subcontinent, Sri Rama sat in meditation for three nights praying to Samudra Deva (the deity of the Ocean) to allow safe passage for the righteous army. When Samudra appeared, he revealed that the Vanara architects Nala and Nila possessed the divine engineering gift inherited from Vishwakarma.',
            'Any stone or tree cast into the ocean by Nala and Nila inscribed with the sacred two-syllable name "RA-MA" would defy gravity and float serenely on the turbulent surface.',
            'Millions of Vanaras worked in ecstatic harmony, hauling mountaintops and massive boulders. A tiny squirrel, moved by boundless devotion, rolled in the sand and dusted the grains into the cracks. Rama lovingly stroked the squirrel, leaving the three sacred lines on its back. In just five days, a 100-yojana floating stone causeway was forged across the Palk Strait, and the armies marched towards Lanka.'
          ],
          characters: [
            { name: 'Nala & Nila', role: 'Chief Engineers', desc: 'Sons of celestial architect Vishwakarma whose touch caused stones to float.' },
            { name: 'The Little Squirrel', role: 'Humble Devotee', desc: 'Tiny creature whose heartfelt effort was blessed with the three sacred strokes of Rama.' },
            { name: 'Samudra Deva', role: 'Lord of the Ocean', desc: 'Presiding deity of the seas who revealed the secret of building the floating causeway.' },
            { name: 'Sri Rama', role: 'Supreme Commander', desc: 'Who consecrated the Rameshwaram Jyotirlinga to Lord Shiva before the march.' }
          ],
          sacredGeography: {
            place: 'Setu Bandha (Rameshwaram & Dhanushkodi)',
            modernName: 'Rameshwaram, Tamil Nadu, India',
            significance: 'Site of Rama Setu (Adam’s Bridge) and the historic Ramanathaswamy Temple housing the Rameshwaram Jyotirlinga.'
          },
          dharmaLesson: 'No act of service is too small when rendered with pure heart; collective purpose and faith can conquer the deepest oceans.',
          quiz: {
            question: 'Which divine architect among the Vanaras designed and engineered the floating Rama Setu bridge?',
            options: [
              { text: 'Angada', correct: false },
              { text: 'Nala', correct: true },
              { text: 'Mainda', correct: false },
              { text: 'Dvivida', correct: false }
            ],
            explanation: 'Nala, the son of the celestial master architect Vishwakarma, directed the engineering and placement of floating stones.',
            rewardXp: 210,
            rewardCoins: 80,
            relicName: 'Buoyant Stone Inscribed with Sri Rama Nama'
          }
        },
        {
          id: 'war_with_ravana',
          order: 8,
          title: 'War with Ravana',
          location: 'Lanka',
          region: 'Battlefield of Lanka',
          kanda: 'Yuddha Kanda',
          status: 'boss',
          badgeType: 'boss',
          coords: { left: 76.17, top: 70.0 },
          image: 'assets/ramayana_nodes/war_with_ravana.png',
          subtitle: 'The Epic Clash and the Triumph of Light over Darkness',
          shlokaDevanagari: 'आदित्यहृदयं पुण्यं सर्वशत्रुविनाशनम् । जयावहं जपेन्नित्यमक्षयं परमं शिवम् ॥',
          shlokaTransliteration: 'āditya-hṛdayaṁ puṇyaṁ sarva-śatru-vināśanam | jayāvahaṁ japen nityam akṣayaṁ paramaṁ śivam ||',
          shlokaMeaning: 'Chant the holy hymn of Aditya Hridayam, destroyer of all internal and external adversaries, which bestows inexhaustible victory and supreme auspiciousness.',
          audioText: 'Aaditya hridayam punyam sarva shatru vinashanam. Jayavaham japen nityam akshayam paramam shivam.',
          story: [
            'On the shores of Lanka, one of the greatest battles in history unfolded between the forces of Dharma and Adharma. Despite noble pleas from Vibhishana to return Sita and avert catastrophe, Ravana’s pride made war inevitable. Vibhishana sought refuge at the lotus feet of Rama (Sharanagati) and was crowned king-in-exile.',
            'Mighty titans such as the giant Kumbhakarna and the conqueror of Indra, Indrajit (Meghnada), fell before Rama and Lakshmana. When Lakshmana was mortally struck by the Shakti missile, Hanuman flew to the Himalayas and carried the entire Sanjeevani mountain to resurrect him.',
            'In the climactic battle, Ravana rode his dark chariot into the arena. Sage Agastya appeared and instructed Rama in the sacred Aditya Hridayam stotra to invoke the invincible solar consciousness. Consecrating the Brahmastra arrow gifted by Agastya, Rama aimed at Ravana’s navel where the nectar of immortality was concealed. The celestial shaft struck true, ending the reign of tyranny and liberating the worlds from fear.'
          ],
          characters: [
            { name: 'Ravana', role: 'Ten-Headed Overlord', desc: 'Great scholar of Vedas blinded by ego whose arrogance brought the destruction of his empire.' },
            { name: 'Vibhishana', role: 'Seeker of Dharma', desc: 'Righteous brother of Ravana who chose dharma over clan loyalty and surrendered to Rama.' },
            { name: 'Indrajit (Meghnada)', role: 'Sorcerer Prince', desc: 'Master of celestial illusion weapons defeated by the ascetic vows of Lakshmana.' },
            { name: 'Lord Hanuman', role: 'Lifesaver of Armies', desc: 'Devotee who uprooted Mount Dronagiri to fetch the Sanjeevani herb.' }
          ],
          sacredGeography: {
            place: 'Battlefields of Lanka',
            modernName: 'Sri Lanka (Yudhaganawa, Ravana Ella)',
            significance: 'Historic battle sites where the eternal principles of truth, righteousness, and surrender were consecrated.'
          },
          dharmaLesson: 'Pride and unchecked desire destroy even the mightiest civilizations; truth and righteousness inevitably triumph over arrogance.',
          quiz: {
            question: 'Which sacred solar hymn was taught to Lord Rama by Sage Agastya on the battlefield to ensure total victory?',
            options: [
              { text: 'Vishnu Sahasranama', correct: false },
              { text: 'Aditya Hridayam', correct: true },
              { text: 'Gayatri Mantra', correct: false },
              { text: 'Shiva Tandava Stotram', correct: false }
            ],
            explanation: 'Sage Agastya imparted the sacred Aditya Hridayam stotra, addressing the divine Sun God, before Rama vanquished Ravana.',
            rewardXp: 250,
            rewardCoins: 100,
            relicName: 'The Divine Brahmastra Arrowhead'
          }
        },
        {
          id: 'return_to_ayodhya',
          order: 9,
          title: 'Return to Ayodhya',
          location: 'Pushpak Vimana',
          region: 'Aerial Route: Lanka to Nandigrama & Ayodhya',
          kanda: 'Yuddha Kanda',
          status: 'available',
          badgeType: 'available',
          coords: { left: 57.62, top: 66.67 },
          image: 'assets/ramayana_nodes/return_to_ayodhya.png',
          subtitle: 'The Voyage of the Celestial Pushpaka Chariot',
          shlokaDevanagari: 'पुष्पकेण विमानेन खेचरेण विराजता । स जगाम समं भ्रात्रा सीतया सह राघवः ॥',
          shlokaTransliteration: 'puṣpakeṇa vimānena khe-careṇa virājatā | sa jagāma samaṁ bhrātrā sītayā saha rāghavaḥ ||',
          shlokaMeaning: 'Aboard the resplendent celestial vehicle Pushpaka traversing the azure sky, Sri Rama journeyed joyfully in the company of Sita and his heroic brothers.',
          audioText: 'Pushpakena vimanena khecharena virajata. Sa jagama samam bhratra Seetaya saha Raghavah.',
          story: [
            'Following the victory, Devi Sita emerged from captivity in radiant purity, and the righteous Vibhishana was anointed as King of Lanka. With the fourteen-year exile period drawing to its final hours, Rama was eager to return before Bharata, who had vowed to enter the sacred fire if Rama did not arrive on time.',
            'Vibhishana placed the magnificent Pushpaka Vimana—a self-navigating celestial chariot crafted by Vishwakarma—at Rama’s service. Sri Rama, Sita, Lakshmana, Sugriva, Hanuman, Angada, and the Vanara commanders boarded the radiant craft.',
            'As the Pushpaka Vimana soared northwards over the Indian subcontinent, Rama lovingly pointed out the sacred pilgrimage sites below to Sita: Setu Bandha, Kishkindha, the hermitages of Rishis along the Godavari, and the confluence of Ganga and Yamuna at Prayag. Landing near Nandigrama, Rama sent Hanuman ahead to deliver glad tidings to the ascetic Bharata.'
          ],
          characters: [
            { name: 'Sri Rama', role: 'Victorious Sovereign', desc: 'Returning to his homeland after fulfilling the divine purpose of avatarahood.' },
            { name: 'Devi Sita', role: 'Radiant Empress', desc: 'Reunited with Rama, gazing upon the sacred lands of Bharatavarsha from the skies.' },
            { name: 'Bharata', role: 'The Ascetic Brother', desc: 'Who ruled Ayodhya for 14 years living as a hermit, placing Rama’s sandals on the throne.' },
            { name: 'Pushpaka Vimana', role: 'Celestial Chariot', desc: 'Wondrous flying vessel capable of accommodating all pure-hearted seekers.' }
          ],
          sacredGeography: {
            place: 'Nandigrama & Prayagraj',
            modernName: 'Nandigram, Uttar Pradesh',
            significance: 'Where Bharata lived as an ascetic guardian of Rama’s Padukas (sandals) and received the joyous reunion.'
          },
          dharmaLesson: 'True brotherly love and selfless administration put duty above power; promises must be kept with total punctuality.',
          quiz: {
            question: 'What was the name of the divine celestial flying chariot used by Lord Rama and Sita to return to Ayodhya?',
            options: [
              { text: 'Garuda Vimana', correct: false },
              { text: 'Pushpaka Vimana', correct: true },
              { text: 'Chitraratha', correct: false },
              { text: 'Surya Ratha', correct: false }
            ],
            explanation: 'The Pushpaka Vimana, an ancient celestial chariot that flew by thought and will, carried the victorious retinue north to Ayodhya.',
            rewardXp: 220,
            rewardCoins: 85,
            relicName: 'Crest Jewel of the Pushpaka Vimana'
          }
        },
        {
          id: 'ramas_coronation',
          order: 10,
          title: "Rama's Coronation",
          location: 'Ayodhya',
          region: 'Royal Palace of Ayodhya',
          kanda: 'Uttara Kanda / Yuddha Kanda Epilogue',
          status: 'locked',
          badgeType: 'locked',
          coords: { left: 41.7, top: 71.17 },
          image: 'assets/ramayana_nodes/ramas_coronation.png',
          subtitle: 'The Dawn of Ramarajya: The Golden Age of Virtue',
          shlokaDevanagari: 'रामो रामो राम इति प्रजानामभवन् कथाः । रामभूतं जगदभूद् रामे राज्यं प्रशासति ॥',
          shlokaTransliteration: 'rāmo rāmo rāma iti prajānām abhavan kathāḥ | rāma-bhūtaṁ jagad abhūd rāme rājyaṁ praśāsati ||',
          shlokaMeaning: 'Rama, Rama, Rama—such was the joyful celebration among all people. The entire world became immersed in peace, truth, and joy as Rama governed the realm.',
          audioText: 'Ramo Ramo Rama iti prajanam abhavan kathah. Ramabhootam jagad abhood Rame rajyam prashasati.',
          story: [
            'Upon returning to Ayodhya on the day now celebrated across the world as Diwali (Deepavali), the citizens illuminated every balcony, rooftop, and doorstep with glowing oil lamps (diyas) to welcome their beloved king.',
            'On an auspicious muhurta, Sage Vasishtha and the venerated rishis gathered waters from four oceans and five hundred sacred rivers. With chants from the four Vedas, King Rama was anointed and the ancestral golden crown of the Ikshvaku kings placed upon his head beside Queen Sita.',
            'This heralded the dawn of Ramarajya—an ideal civilization where peace reigned, no child died before their parent, agriculture flourished without droughts, and truth guided everyday life. Rama honored every ally with boundless love, bestowing upon Hanuman the boon of eternal devotion, residing forever within his heart.'
          ],
          characters: [
            { name: 'Maryada Purushottama Rama', role: 'Crowned King of Ayodhya', desc: 'Exemplary sovereign who embodied justice, compassion, and divine leadership.' },
            { name: 'Empress Sita', role: 'Pattada Rani', desc: 'Goddess of abundance whose presence sanctified the kingdom with peace.' },
            { name: 'Shatrughna, Bharata, Lakshmana', role: 'Royal Brothers', desc: 'United in eternal fraternity, governance, and spiritual service.' },
            { name: 'Lord Hanuman', role: 'Eternal Companion', desc: 'Granted the highest blessing of unbroken love and immortality.' }
          ],
          sacredGeography: {
            place: 'Kanak Bhavan & Ram Janmabhoomi',
            modernName: 'Ayodhya, Uttar Pradesh, India',
            significance: 'The coronation hall and royal abode celebrated annually during the Festival of Lights (Deepavali).'
          },
          dharmaLesson: 'An ideal society flourishes when leaders govern as servants of truth, where justice, empathy, and virtue guide every decision.',
          quiz: {
            question: 'What festival is globally celebrated to commemorate Lord Rama’s victorious return to Ayodhya and his coronation?',
            options: [
              { text: 'Holi', correct: false },
              { text: 'Deepavali (Diwali)', correct: true },
              { text: 'Navaratri', correct: false },
              { text: 'Makar Sankranti', correct: false }
            ],
            explanation: 'Deepavali (Diwali) commemorates the joyous illumination of Ayodhya welcoming Lord Rama, Sita, and Lakshmana back from exile.',
            rewardXp: 300,
            rewardCoins: 120,
            relicName: 'The Ancestral Golden Crown of Ikshvaku'
          }
        }
      ]
    },
    religiousTraditions: [
      {
        id: 'hindu_traditions',
        title: 'Hindu Traditions',
        emblem: 'ॐ',
        emblemText: 'ॐ',
        description: 'Explore the wisdom of Yugas, Epics, Deities, Festivals & Ancient Knowledge',
        image: 'assets/path_hindu.jpg',
        badge: 'Sanatana Dharma',
        colorClass: 'subpath-hindu',
        accentColor: '#D4993B',
        progress: 55,
        totalEvents: 16,
        completedEvents: 9,
        currentModule: {
          title: 'Sanatana Dharma & The Cosmic Order',
          question: 'In Hindu philosophy and tradition, what fundamental concept represents the cosmic order, universal harmony, righteousness, and the sacred duties of each being?',
          options: [
            { text: 'Karma (Action and reaction)', correct: false },
            { text: 'Dharma (Cosmic order and righteous duty)', correct: true },
            { text: 'Moksha (Liberation from rebirth)', correct: false },
            { text: 'Samsara (The cycle of existence)', correct: false }
          ],
          rewardXp: 180,
          rewardCoins: 50,
          rewardRelic: {
            id: 'relic_om_yantra',
            title: 'Sacred Golden Om Yantra',
            type: 'Sacred Antiquity',
            era: 'Vedic Antiquity',
            icon: '🕉️'
          }
        }
      },
      {
        id: 'buddhist_heritage',
        title: 'Buddhist Heritage',
        emblem: '☸',
        emblemText: '☸',
        description: 'Follow the path of Buddha, his teachings and the spread of Dharma',
        image: 'assets/path_buddhist.jpg',
        badge: 'Noble Eightfold Path',
        colorClass: 'subpath-buddhist',
        accentColor: '#6B90B5',
        progress: 35,
        totalEvents: 14,
        completedEvents: 5,
        currentModule: {
          title: 'The First Sermon at Sarnath',
          question: 'Where did Gautama Buddha deliver his historic first discourse, known as the Dhammacakkappavattana Sutta, setting the Wheel of Dhamma in motion?',
          options: [
            { text: 'Bodh Gaya under the sacred Bodhi Tree', correct: false },
            { text: 'Deer Park in Sarnath near Varanasi', correct: true },
            { text: 'Nalanda Monastic University', correct: false },
            { text: 'The mountain cave at Rajgir', correct: false }
          ],
          rewardXp: 160,
          rewardCoins: 45,
          rewardRelic: {
            id: 'relic_dharmachakra',
            title: 'Sarnath Monolithic Dharmachakra',
            type: 'Imperial Stone Relic',
            era: 'Mauryan Empire',
            icon: '☸️'
          }
        }
      },
      {
        id: 'jain_philosophy',
        title: 'Jain Philosophy',
        emblem: '✋',
        emblemText: '✋',
        description: 'Discover the journey of Tirthankaras, Ahimsa, and Jain heritage',
        image: 'assets/path_jain.jpg',
        badge: 'Ahimsa & Anekantavada',
        colorClass: 'subpath-jain',
        accentColor: '#C49752',
        progress: 25,
        totalEvents: 12,
        completedEvents: 3,
        currentModule: {
          title: 'The Teachings of Lord Mahavira',
          question: 'Who was the 24th and last Tirthankara of the current cosmic time cycle, renowned for revitalizing the core vows of Ahimsa (non-violence) and Satya?',
          options: [
            { text: 'Lord Rishabhanatha (Adinatha)', correct: false },
            { text: 'Lord Parshvanatha', correct: false },
            { text: 'Lord Mahavira (Vardhamana)', correct: true },
            { text: 'Lord Neminatha', correct: false }
          ],
          rewardXp: 160,
          rewardCoins: 45,
          rewardRelic: {
            id: 'relic_ahimsa_wheel',
            title: 'Dilwara Carved Marble Ahimsa Wheel',
            type: 'Sacred Marble Sculpture',
            era: 'Solanki Period',
            icon: '🪷'
          }
        }
      },
      {
        id: 'sikh_legacy',
        title: 'Sikh Legacy',
        emblem: '☬',
        emblemText: '☬',
        description: 'Learn about the Sikh Gurus, battles, values & culture',
        image: 'assets/path_sikh.jpg',
        badge: 'Khalsa Panth & Seva',
        colorClass: 'subpath-sikh',
        accentColor: '#4A7F99',
        progress: 40,
        totalEvents: 14,
        completedEvents: 6,
        currentModule: {
          title: 'The Foundation of the Khalsa',
          question: 'Which revered Sikh Guru formalized the Khalsa Panth in 1699 on Vaisakhi at Anandpur Sahib, inaugurating the Panj Pyare?',
          options: [
            { text: 'Guru Nanak Dev Ji', correct: false },
            { text: 'Guru Gobind Singh Ji', correct: true },
            { text: 'Guru Arjan Dev Ji', correct: false },
            { text: 'Guru Tegh Bahadur Ji', correct: false }
          ],
          rewardXp: 170,
          rewardCoins: 50,
          rewardRelic: {
            id: 'relic_kirpan',
            title: 'Sacred Steel Kirpan of Anandpur',
            type: 'Sacred Regalia',
            era: 'Khalsa Era',
            icon: '⚔️'
          }
        }
      },
      {
        id: 'folk_traditions',
        title: 'Other Traditions & Folk Cultures',
        emblem: '🎭',
        emblemText: '🎭',
        description: 'Explore diverse tribal, folk and regional traditions',
        image: 'assets/path_folk.jpg',
        badge: 'Living Folk & Tribal Lore',
        colorClass: 'subpath-folk',
        accentColor: '#9C5832',
        progress: 20,
        totalEvents: 12,
        completedEvents: 2,
        currentModule: {
          title: 'The Sacred Theatre of Theyyam',
          question: 'The ritual dance-theatre tradition of Theyyam, invoking sacred deities and folk legends through monumental headdresses and vibrant sacred face paint, originates primarily in:',
          options: [
            { text: 'North Malabar region of Kerala', correct: true },
            { text: 'Shekhawati desert region of Rajasthan', correct: false },
            { text: 'Kullu Valley of Himachal Pradesh', correct: false },
            { text: 'Sundarbans of Bengal', correct: false }
          ],
          rewardXp: 150,
          rewardCoins: 40,
          rewardRelic: {
            id: 'relic_theyyam_crown',
            title: 'Ceremonial Theyyam Headdress Relief',
            type: 'Folk Antiquity',
            era: 'Traditional Heritage',
            icon: '👺'
          }
        }
      }
    ],
    paths: [
      {
        id: 'spiritual',
        title: 'Religious & Spiritual Traditions',
        subtitle: 'Vedas, Dharma, Rituals & Devotion',
        emblem: '🙏',
        colorClass: 'path-spiritual',
        progress: 45,
        totalEvents: 12,
        completedEvents: 5,
        currentModule: {
          title: 'The Vedic Fire Rituals',
          question: 'The ancient Vedic Yajna (fire ritual) was performed to invoke the blessings of the gods. Which Veda is primarily a collection of hymns and mantras used during these rituals?',
          options: [
            { text: 'Yajur Veda', correct: false },
            { text: 'Rig Veda', correct: true },
            { text: 'Sama Veda', correct: false },
            { text: 'Atharva Veda', correct: false }
          ],
          rewardXp: 150,
          rewardCoins: 40,
          rewardRelic: {
            id: 'relic_veda',
            title: 'Sacred Palm Leaf of Rig Veda',
            type: 'Manuscript',
            era: 'Vedic Period',
            icon: '📜'
          }
        }
      },
      {
        id: 'civilisation',
        title: 'Civilisation & Ancient India',
        subtitle: 'Indus Valley, Empires & Governance',
        emblem: '🏛️',
        colorClass: 'path-civilisation',
        progress: 30,
        totalEvents: 10,
        completedEvents: 3,
        currentModule: {
          title: 'The Great Bath of Mohenjo-daro',
          question: 'The advanced urban planning of the Indus Valley Civilisation is showcased by the Great Bath at Mohenjo-daro. What was its primary purpose?',
          options: [
            { text: 'A royal swimming pool', correct: false },
            { text: 'Ritualistic bathing & purification', correct: true },
            { text: 'A water storage reservoir', correct: false },
            { text: 'A military training ground', correct: false }
          ],
          rewardXp: 140,
          rewardCoins: 35,
          rewardRelic: {
            id: 'relic_indus',
            title: 'Indus Valley Seal',
            type: 'Stone Seal',
            era: 'Indus Valley Period',
            icon: '🔱'
          }
        }
      },
      {
        id: 'artculture',
        title: 'Art, Architecture & Culture',
        subtitle: 'Temples, Dance, Music & Crafts',
        emblem: '🎭',
        colorClass: 'path-artculture',
        progress: 20,
        totalEvents: 8,
        completedEvents: 2,
        currentModule: {
          title: 'The Rock-Cut Temples of Ellora',
          question: 'The Kailasa Temple at Ellora, carved from a single monolithic rock, is dedicated to which Hindu deity?',
          options: [
            { text: 'Lord Vishnu', correct: false },
            { text: 'Lord Brahma', correct: false },
            { text: 'Lord Shiva', correct: true },
            { text: 'Lord Ganesha', correct: false }
          ],
          rewardXp: 130,
          rewardCoins: 30,
          rewardRelic: {
            id: 'relic_ellora',
            title: 'Kailasa Temple Miniature',
            type: 'Stone Carving',
            era: 'Rashtrakuta Dynasty',
            icon: '🛕'
          }
        }
      },
      {
        id: 'folklore',
        title: 'Stories & Folklore',
        subtitle: 'Epics, Legends, Myths & Tales',
        emblem: '📖',
        colorClass: 'path-folklore',
        progress: 15,
        totalEvents: 8,
        completedEvents: 1,
        currentModule: {
          title: 'The Panchatantra Tales',
          question: 'The Panchatantra, one of the oldest collections of fables, was written by which ancient scholar to educate the princes of a king?',
          options: [
            { text: 'Chanakya (Kautilya)', correct: false },
            { text: 'Vishnu Sharma', correct: true },
            { text: 'Valmiki', correct: false },
            { text: 'Kalidasa', correct: false }
          ],
          rewardXp: 160,
          rewardCoins: 45,
          rewardRelic: {
            id: 'relic_panchatantra',
            title: 'Illustrated Panchatantra Scroll',
            type: 'Ancient Manuscript',
            era: 'Classical India',
            icon: '📜'
          }
        }
      },
      {
        id: 'tradgames',
        title: 'Traditional Games',
        subtitle: 'Chaturanga, Kabaddi, Gilli-Danda',
        emblem: '🎲',
        colorClass: 'path-tradgames',
        progress: 50,
        totalEvents: 14,
        completedEvents: 7,
        currentModule: {
          title: 'Chaturanga — The Origin of Chess',
          question: 'Chaturanga, the ancient Indian game that evolved into modern chess, derives its name from four divisions of which institution?',
          options: [
            { text: 'The ancient Indian army (infantry, cavalry, elephants, chariots)', correct: true },
            { text: 'The four Vedas', correct: false },
            { text: 'The four stages of life (Ashramas)', correct: false },
            { text: 'The four cardinal directions', correct: false }
          ],
          rewardXp: 180,
          rewardCoins: 60,
          rewardRelic: {
            id: 'relic_chaturanga',
            title: 'Ivory Chaturanga Piece',
            type: 'Game Artifact',
            era: 'Gupta Empire',
            icon: '♟️'
          }
        }
      }
    ],
    recentUnlocks: [
      {
        id: 'unlock_1',
        title: 'Ayodhya Stele Inscription',
        era: 'Treta Yuga',
        type: 'Carved Bas-Relief',
        icon: '🪨',
        image: 'stele'
      },
      {
        id: 'unlock_2',
        title: 'Vedic Fire Altar Layout',
        era: 'Vedic Period',
        type: 'Sacred Architecture',
        icon: '🔥',
        image: 'altar'
      },
      {
        id: 'unlock_3',
        title: 'Sudarshana Reservoir Blueprint',
        era: 'Mauryan Empire',
        type: 'Hydraulic Engineering',
        icon: '🌊',
        image: 'reservoir'
      },
      {
        id: 'unlock_4',
        title: 'Nalanda Copper Plate Charter',
        era: 'Gupta Renaissance',
        type: 'Royal Manuscript',
        icon: '📜',
        image: 'plate'
      },
      {
        id: 'unlock_5',
        title: 'Brihadisvara Granite Pillar',
        era: 'Chola Dynasty',
        type: 'Temple Sculpture',
        icon: '🏛️',
        image: 'temple'
      },
      {
        id: 'unlock_6',
        title: 'Rigvedic Hymn Manuscript',
        era: 'Ancient Saptasindhu',
        type: 'Sacred Text',
        icon: '📖',
        image: 'hymn'
      },
      {
        id: 'unlock_7',
        title: 'Golden Ashoka Chakra Medal',
        era: 'Imperial Magadha',
        type: 'Imperial Medallion',
        icon: '☸️',
        image: 'chakra'
      }
    ]
  };

  class PlayerStateStore {
    constructor() {
      this.listeners = [];
      this.state = this.loadState();
    }

    loadState() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          return {
            ...defaultState,
            ...parsed,
            religiousTraditions: parsed.religiousTraditions && parsed.religiousTraditions.length === 5 ? parsed.religiousTraditions : defaultState.religiousTraditions,
            selectedReligiousPathId: parsed.selectedReligiousPathId || defaultState.selectedReligiousPathId,
            ramayanaTimeline: (parsed.ramayanaTimeline && parsed.ramayanaTimeline.events && parsed.ramayanaTimeline.events.length === 10) 
              ? parsed.ramayanaTimeline 
              : defaultState.ramayanaTimeline
          };
        }
      } catch (e) {
        console.warn('Could not read saved state from localStorage:', e);
      }
      return JSON.parse(JSON.stringify(defaultState));
    }

    saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        console.warn('Could not save state to localStorage:', e);
      }
      this.notify();
    }

    getState() {
      return this.state;
    }

    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }

    notify() {
      for (const listener of this.listeners) {
        try {
          listener(this.state);
        } catch (e) {
          console.error('Error in state subscriber:', e);
        }
      }
    }

    // ─── Dynamic Growth & Progression Actions ───

    addXP(amount) {
      this.state.user.xp += amount;
      let leveledUp = false;

      while (this.state.user.xp >= this.state.user.nextLevelXp) {
        this.state.user.xp -= this.state.user.nextLevelXp;
        this.state.user.level += 1;
        this.state.user.nextLevelXp = Math.floor(this.state.user.nextLevelXp * 1.25);
        leveledUp = true;
      }

      this.saveState();
      return { leveledUp, newLevel: this.state.user.level, xp: this.state.user.xp, nextLevelXp: this.state.user.nextLevelXp };
    }

    addCurrencies(coins = 0, gems = 0, shards = 0) {
      this.state.currencies.coins += coins;
      this.state.currencies.gems += gems;
      this.state.currencies.shards += shards;
      this.saveState();
    }

    advanceJourney(amount = 15) {
      let journey = this.state.activeJourney;
      journey.progress = Math.min(100, journey.progress + amount);

      // Advance daily quest count if not already finished
      this.advanceDailyQuest();

      // Award XP and coins
      this.addXP(120);
      this.addCurrencies(40, 5, 0);

      // If chapter completed, cycle to next story
      if (journey.progress >= 100) {
        journey.stage += 1;
        if (journey.stage > journey.totalStages) {
          journey.stage = 1;
          journey.chapter = 'Dandaka Hermitages';
        } else if (journey.stage === 4) {
          journey.chapter = 'Panchavati Sanctum';
        }
        journey.progress = 10;
      }

      this.saveState();
      return journey;
    }

    advanceDailyQuest() {
      if (!this.state.dailyQuest.claimed && this.state.dailyQuest.current < this.state.dailyQuest.target) {
        this.state.dailyQuest.current += 1;
        this.saveState();
      }
    }

    claimDailyQuest() {
      if (this.state.dailyQuest.current >= this.state.dailyQuest.target && !this.state.dailyQuest.claimed) {
        this.state.dailyQuest.claimed = true;
        this.addCurrencies(this.state.dailyQuest.reward, 10, 1);
        this.addXP(200);
        this.saveState();
        return true;
      }
      return false;
    }

    completePathModule(pathId) {
      const path = this.state.paths.find(p => p.id === pathId);
      if (!path) return null;

      // Increment progress
      path.completedEvents = Math.min(path.totalEvents, path.completedEvents + 1);
      path.progress = Math.min(100, Math.round((path.completedEvents / path.totalEvents) * 100));

      const module = path.currentModule;
      const xpGained = module.rewardXp || 100;
      const coinsGained = module.rewardCoins || 30;

      // Add to recent unlocks
      if (module.rewardRelic) {
        const newRelic = {
          id: module.rewardRelic.id + '_' + Date.now(),
          title: module.rewardRelic.title,
          era: module.rewardRelic.era,
          type: module.rewardRelic.type,
          icon: module.rewardRelic.icon || '🏺',
          image: path.id
        };
        // Prepend to recent unlocks
        this.state.recentUnlocks.unshift(newRelic);
        if (this.state.recentUnlocks.length > 12) {
          this.state.recentUnlocks.pop();
        }
      }

      // Check daily quest
      this.advanceDailyQuest();

      // Award XP & Coins
      const levelResult = this.addXP(xpGained);
      this.addCurrencies(coinsGained, 8, 1);

      this.saveState();
      return {
        path,
        xpGained,
        coinsGained,
        relic: module.rewardRelic,
        leveledUp: levelResult.leveledUp,
        newLevel: levelResult.newLevel
      };
    }

    selectReligiousTradition(subPathId) {
      if (!this.state.religiousTraditions) return null;
      const found = this.state.religiousTraditions.find(t => t.id === subPathId);
      if (found) {
        this.state.selectedReligiousPathId = subPathId;
        this.saveState();
        return found;
      }
      return null;
    }

    getSelectedReligiousTradition() {
      if (!this.state.religiousTraditions) return null;
      return this.state.religiousTraditions.find(t => t.id === this.state.selectedReligiousPathId) || this.state.religiousTraditions[0];
    }

    completeReligiousTraditionModule(subPathId) {
      const tradition = (this.state.religiousTraditions || []).find(t => t.id === subPathId);
      if (!tradition) return null;

      tradition.completedEvents = Math.min(tradition.totalEvents, tradition.completedEvents + 1);
      tradition.progress = Math.min(100, Math.round((tradition.completedEvents / tradition.totalEvents) * 100));

      const module = tradition.currentModule;
      const xpGained = module.rewardXp || 150;
      const coinsGained = module.rewardCoins || 45;

      if (module.rewardRelic) {
        const newRelic = {
          id: module.rewardRelic.id + '_' + Date.now(),
          title: module.rewardRelic.title,
          era: module.rewardRelic.era,
          type: module.rewardRelic.type,
          icon: module.rewardRelic.icon || '🏺',
          image: tradition.id
        };
        this.state.recentUnlocks.unshift(newRelic);
        if (this.state.recentUnlocks.length > 15) {
          this.state.recentUnlocks.pop();
        }
      }

      this.advanceDailyQuest();
      const levelResult = this.addXP(xpGained);
      this.addCurrencies(coinsGained, 8, 1);

      // Also advance overall spiritual path progress
      const spiritualPath = this.state.paths.find(p => p.id === 'spiritual');
      if (spiritualPath) {
        spiritualPath.completedEvents = Math.min(spiritualPath.totalEvents, spiritualPath.completedEvents + 1);
        spiritualPath.progress = Math.min(100, Math.round((spiritualPath.completedEvents / spiritualPath.totalEvents) * 100));
      }

      this.saveState();
      return {
        tradition,
        xpGained,
        coinsGained,
        relic: module.rewardRelic,
        leveledUp: levelResult.leveledUp,
        newLevel: levelResult.newLevel
      };
    }

    // ─── Ramayana Timeline Map Methods ───
    getRamayanaTimeline() {
      return this.state.ramayanaTimeline || defaultState.ramayanaTimeline;
    }

    getRamayanaEvents() {
      return (this.state.ramayanaTimeline && this.state.ramayanaTimeline.events) 
        ? this.state.ramayanaTimeline.events 
        : defaultState.ramayanaTimeline.events;
    }

    getRamayanaEvent(eventId) {
      const events = this.getRamayanaEvents();
      return events.find(e => e.id === eventId) || null;
    }

    completeRamayanaEvent(eventId) {
      const events = this.getRamayanaEvents();
      const currentEvent = events.find(e => e.id === eventId);
      if (!currentEvent) return null;

      const wasAlreadyCompleted = currentEvent.status === 'completed';
      currentEvent.status = 'completed';
      currentEvent.badgeType = 'completed';

      // Unlock next event if it is locked or in progress
      const currentIndex = events.findIndex(e => e.id === eventId);
      if (currentIndex !== -1 && currentIndex + 1 < events.length) {
        const nextEvent = events[currentIndex + 1];
        if (nextEvent.status === 'locked' || nextEvent.status === 'available') {
          nextEvent.status = 'in_progress';
          nextEvent.badgeType = 'in_progress';
        }
      }

      // Rewards
      const xpGained = wasAlreadyCompleted ? 30 : (currentEvent.quiz?.rewardXp || 150);
      const coinsGained = wasAlreadyCompleted ? 15 : (currentEvent.quiz?.rewardCoins || 50);

      // Add relic if not already completed
      if (!wasAlreadyCompleted && currentEvent.quiz?.relicName) {
        const newRelic = {
          id: `relic_${currentEvent.id}`,
          title: currentEvent.quiz.relicName,
          era: 'Treta Yuga (Ramayana)',
          type: 'Sacred Relic of Dharma',
          icon: '🏹',
          image: currentEvent.id
        };
        this.state.recentUnlocks.unshift(newRelic);
        if (this.state.recentUnlocks.length > 15) {
          this.state.recentUnlocks.pop();
        }
      }

      // Update Hindu Tradition progress count
      const hinduTradition = (this.state.religiousTraditions || []).find(t => t.id === 'hindu_traditions');
      if (hinduTradition) {
        const completedCount = events.filter(e => e.status === 'completed').length;
        hinduTradition.completedEvents = completedCount;
        hinduTradition.totalEvents = events.length;
        hinduTradition.progress = Math.round((completedCount / events.length) * 100);
      }

      this.advanceDailyQuest();
      const levelResult = this.addXP(xpGained);
      this.addCurrencies(coinsGained, 10, 1);

      this.saveState();
      return {
        event: currentEvent,
        wasAlreadyCompleted,
        xpGained,
        coinsGained,
        relicName: currentEvent.quiz?.relicName,
        leveledUp: levelResult.leveledUp,
        newLevel: levelResult.newLevel
      };
    }

    resetProgress() {
      this.state = JSON.parse(JSON.stringify(defaultState));
      this.saveState();
    }
  }

  // Expose singleton on window
  window.PlayerState = new PlayerStateStore();
})();
