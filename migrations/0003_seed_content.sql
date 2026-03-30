-- Seed initial content from website/public/data JSON files.
-- Uses INSERT OR IGNORE so it is safe to re-run and will not overwrite
-- any content that has already been added via the CMS.

INSERT OR IGNORE INTO news_item (id, title, text, body, link, linkText, sections, createdAt, updatedAt) VALUES
(
  'news_seed_01',
  '50 Years of East Leake FC',
  '2025 marks our golden anniversary — five decades of football in the heart of the village.',
  'It''s hard to believe that what started as a small group of friends kicking a ball around a muddy field in 1975 has grown into the club we have today. East Leake FC turns 50 this year, and we''re planning a season to remember.

Celebrations will include a gala dinner at the East Leake Memorial Hall in November, a special commemorative kit worn across all sections for selected fixtures, and an alumni day where former players, managers, and committee members are invited back to Costock Road to reconnect.

We''ve also been speaking to the Rushcliffe local history group about documenting the club''s story properly — if you have old photos, programmes, or memories you''d like to share, please get in touch. We want to honour everyone who''s worn the shirt across five decades.

Watch this space for ticket and event details as the season progresses. Here''s to the next 50.',
  '#',
  'Read More',
  NULL,
  1700000000000,
  1700000000000
),
(
  'news_seed_02',
  'Pre-Season Training Returns',
  'Pre-season is back for all sections — senior, youth, girls, and ladies. Come along and get involved.',
  'After a well-earned summer break, pre-season training is kicking off across all sections of the club. Whether you''re a returning player, a new face, or just thinking about getting back into football — everyone is welcome.

Senior (Robins) pre-season runs every Tuesday and Thursday evening at 7pm, starting from the first week of July. Sessions are held at the East Leake Pavilion, Costock Road, with a mix of fitness work, small-sided games, and tactical preparation for the new campaign.

Youth training resumes the same week, with age-group sessions across the week — full schedule to be confirmed by each team''s manager. Parents are encouraged to come along for the first session.

Girls and Ladies sections return on Wednesday evenings from mid-July. New players of all abilities are especially welcome across both squads as we look to grow the women''s game at the club this season.

Don''t worry if you''re a little rusty — that''s what pre-season is for. Just bring boots, water, and a willingness to work hard.',
  '#',
  'Read More',
  NULL,
  1700000000000,
  1700000000000
),
(
  'news_seed_03',
  'Sponsorship Opportunities for 2025–26',
  'We''re looking for local businesses to partner with us for the new season. Kit sponsors, matchday sponsors, and more.',
  'East Leake FC is proud to be a community club — and that means we rely on the support of local businesses to keep things running. Ahead of the 2025–26 season, we''re actively looking for sponsors across all sections of the club.

Opportunities include kit sponsorship (get your business name on the shirt), matchday sponsorship (social media coverage and pre-match recognition), programme advertising in our new digital matchday programme, and equipment support for our youngest players.

All sponsors will be featured on our website and social media channels throughout the season. We''re a family club with real community roots — partnering with us puts your business in front of hundreds of local families every week.

Get in touch via the contact page to discuss packages and pricing.',
  '#contact',
  'Get in Touch',
  NULL,
  1700000000000,
  1700000000000
),
(
  'news_seed_04',
  'New Players Welcome — All Sections',
  'Looking to play football this season? East Leake FC has a place for everyone, from U7s to the Ladies team.',
  'Whether you''re 6 or 60, a seasoned player or someone who''s never laced a boot competitively — East Leake FC wants to hear from you.

Our junior Bantams section runs teams from Under 7s all the way through to Under 16s, with girls-only teams in the junior age groups. Training is fun, structured, and run by FA-qualified coaches who believe every child should enjoy their football.

On the senior side, our Robins First Team and Reserves compete in local league football and are always keen to add quality and depth to the squad. If you''ve played at any level and want to get back involved, come along to pre-season training — no trial needed, just turn up.

Our Ladies section is growing fast and welcomes players of all abilities. Can''t commit to playing? We''re also looking for volunteers — coaches, first-aiders, committee members, or just extra pairs of hands on matchday.

Contact us through the website or just come down to Costock Road on a training night.',
  '#contact',
  'Get in Touch',
  NULL,
  1700000000000,
  1700000000000
),
(
  'news_seed_05',
  'Costock Road Improvements Planned',
  'The committee has approved works to improve the changing facilities and pitch drainage ahead of the new season.',
  'Following feedback from players and managers across all sections, the club committee has approved a programme of ground improvements to be completed before the start of the 2025–26 season.

The main priorities are the changing room refurbishment — both home and away rooms will be repainted with new flooring, hooks, benches, and improved lighting — and pitch drainage works on the east side of the main pitch, which has suffered from waterlogging in recent wet winters.

We''re also repairing and repainting both dugouts, and looking at installing a small covered spectator area near the halfway line.

We''d like to thank everyone who raised these issues at the last AGM. A fundraising push to help offset costs will be announced shortly — look out for details on the website and social media.',
  '#',
  'Read More',
  NULL,
  1700000000000,
  1700000000000
);

INSERT OR IGNORE INTO committee_member (id, role, name, contact, sortOrder, createdAt, updatedAt) VALUES
  ('committee_seed_01', 'Chairperson',    'TBC', 'TBC', 0, 1700000000000, 1700000000000),
  ('committee_seed_02', 'Vice Chair',     'TBC', 'TBC', 1, 1700000000000, 1700000000000),
  ('committee_seed_03', 'Secretary',      'TBC', 'TBC', 2, 1700000000000, 1700000000000),
  ('committee_seed_04', 'Treasurer',      'TBC', 'TBC', 3, 1700000000000, 1700000000000),
  ('committee_seed_05', 'Welfare Officer','TBC', 'TBC', 4, 1700000000000, 1700000000000),
  ('committee_seed_06', 'Registrations',  'TBC', 'TBC', 5, 1700000000000, 1700000000000);

INSERT OR IGNORE INTO team_section (id, sectionKey, name, subtitle, icon, logo, sortOrder, createdAt, updatedAt) VALUES
  ('section_seed_robins',  'robins',  'Robins',  'Men''s Teams',   'fa-shield-alt', 'images/robins.jpg',   0, 1700000000000, 1700000000000),
  ('section_seed_ladies',  'ladies',  'Ladies',  'Women''s Team',  'fa-heart',      'images/ladies.jpg',   1, 1700000000000, 1700000000000),
  ('section_seed_bantams', 'bantams', 'Bantams', 'Junior Teams',   'fa-star',       'images/bantams.jpeg', 2, 1700000000000, 1700000000000);

INSERT OR IGNORE INTO team (id, sectionId, name, description, manager, coach, contact, photo, slug, sidebar, managerLabel, coachLabel, sortOrder, createdAt, updatedAt) VALUES
  ('team_seed_r01', 'section_seed_robins',  'First Team', 'Our flagship senior side, competing in the local Saturday league. Training Tuesday and Thursday evenings.', 'TBC', 'TBC', 'TBC', NULL, 'east-leake-robins-fc',       1, NULL, NULL, 0, 1700000000000, 1700000000000),
  ('team_seed_r02', 'section_seed_robins',  'Reserves',   'Providing competitive football and a development pathway into the first team. A great environment for players looking to step up.', 'TBC', 'TBC', 'TBC', NULL, 'east-leake-robins-reserves',  0, NULL, NULL, 1, 1700000000000, 1700000000000),
  ('team_seed_l01', 'section_seed_ladies',  'Ladies',     'Our ladies team competes in the local women''s league. New players of all abilities are always welcome — come along to a session.', 'TBC', 'TBC', 'TBC', NULL, 'east-leake-fc-ladies',        1, NULL, NULL, 0, 1700000000000, 1700000000000),
  ('team_seed_b01', 'section_seed_bantams', 'Under 6s',   'Our youngest players taking their first steps in football. Fun, non-competitive sessions focused on enjoyment and basic skills.', 'TBC', 'TBC', 'TBC', NULL, NULL, 0, NULL, NULL, 0, 1700000000000, 1700000000000),
  ('team_seed_b02', 'section_seed_bantams', 'Under 7s',   'Small-sided games and skill drills for our U7s. A brilliant introduction to the game in a fun, friendly environment.', 'TBC', 'TBC', 'TBC', NULL, NULL, 0, NULL, NULL, 1, 1700000000000, 1700000000000),
  ('team_seed_b03', 'section_seed_bantams', 'Under 8s',   'Building on the basics with more structured play and introductory mini-league fixtures against local clubs.', 'TBC', 'TBC', 'TBC', NULL, NULL, 0, NULL, NULL, 2, 1700000000000, 1700000000000),
  ('team_seed_b04', 'section_seed_bantams', 'Under 9s',   'Developing technique, teamwork, and a love for the game. Regular training and competitive fixtures throughout the season.', 'TBC', 'TBC', 'TBC', NULL, NULL, 0, NULL, NULL, 3, 1700000000000, 1700000000000),
  ('team_seed_b05', 'section_seed_bantams', 'Under 10s',  'Stepping up to bigger pitches and full season league competition. A key development age group for young players.', 'TBC', 'TBC', 'TBC', NULL, NULL, 0, NULL, NULL, 4, 1700000000000, 1700000000000),
  ('team_seed_b06', 'section_seed_bantams', 'Under 11s',  'Competitive league football with a continued focus on player development and enjoying the game.', 'TBC', 'TBC', 'TBC', NULL, NULL, 0, NULL, NULL, 5, 1700000000000, 1700000000000),
  ('team_seed_b07', 'section_seed_bantams', 'Under 12s',  'Moving into the transition phase of youth football. Strong emphasis on tactical awareness and individual development.', 'TBC', 'TBC', 'TBC', NULL, NULL, 0, NULL, NULL, 6, 1700000000000, 1700000000000),
  ('team_seed_b08', 'section_seed_bantams', 'Under 13s',  'Full-size pitches and competitive league and cup football. A pivotal age group in our youth development pathway.', 'TBC', 'TBC', 'TBC', NULL, NULL, 0, NULL, NULL, 7, 1700000000000, 1700000000000),
  ('team_seed_b09', 'section_seed_bantams', 'Under 14s',  'High-quality youth football for our older juniors, developing players with an eye towards the senior game.', 'TBC', 'TBC', 'TBC', NULL, NULL, 0, NULL, NULL, 8, 1700000000000, 1700000000000);
