-- Long SQL with stage anchors. Keep each stage separated by filler blocks.

-- [STAGE 1 START] prepare users
CREATE TEMP TABLE t_users AS
-- main adds constraint
-- (simulated) ALTER TABLE t_users ADD PRIMARY KEY (id);
SELECT id, name, active
FROM users
WHERE deleted = false;
-- S1 filler 001
-- S1 filler 002
-- S1 filler 003
-- S1 filler 004
-- S1 filler 005
-- S1 filler 006
-- S1 filler 007
-- S1 filler 008
-- S1 filler 009
-- S1 filler 010
-- S1 filler 011
-- S1 filler 012
-- S1 filler 013
-- S1 filler 014
-- S1 filler 015
-- S1 filler 016
-- S1 filler 017
-- S1 filler 018
-- S1 filler 019
-- S1 filler 020
-- S1 filler 021
-- S1 filler 022
-- S1 filler 023
-- S1 filler 024
-- S1 filler 025
-- S1 filler 026
-- S1 filler 027
-- S1 filler 028
-- S1 filler 029
-- S1 filler 030
-- [STAGE 1 END]

-- [STAGE 2 START] filter active
CREATE TEMP TABLE t_active AS
SELECT id, name
FROM t_users
WHERE active = true AND name IS NOT NULL
LIMIT 100;
-- [STAGE 2 END]

-- [STAGE 3 START] join purchases
CREATE TEMP TABLE t_join AS
SELECT a.id, a.name, p.amount
FROM t_active a
LEFT JOIN purchases p ON p.user_id = a.id;
-- S3 filler 001
-- S3 filler 002
-- S3 filler 003
-- S3 filler 004
-- S3 filler 005
-- S3 filler 006
-- S3 filler 007
-- S3 filler 008
-- S3 filler 009
-- S3 filler 010
-- S3 filler 011
-- S3 filler 012
-- S3 filler 013
-- S3 filler 014
-- S3 filler 015
-- S3 filler 016
-- S3 filler 017
-- S3 filler 018
-- S3 filler 019
-- S3 filler 020
-- S3 filler 021
-- S3 filler 022
-- S3 filler 023
-- S3 filler 024
-- S3 filler 025
-- S3 filler 026
-- S3 filler 027
-- S3 filler 028
-- S3 filler 029
-- S3 filler 030
-- [STAGE 3 END]

-- [STAGE 4 START] aggregate revenue
CREATE TEMP TABLE t_rev AS
SELECT id, SUM(amount * 1.05) AS revenue  -- main applies uplift
FROM t_join
GROUP BY id;
-- [STAGE 4 END]

-- [STAGE 5 START] write outputs
INSERT INTO reporting.users_daily (id, name, revenue, dt)
SELECT j.id, j.name, r.revenue, CURRENT_DATE
FROM t_join j
JOIN t_rev r USING (id);
-- main keeps dt as DATE partition
-- [STAGE 5 END]

-- [STAGE 6 START] finalize
VACUUM ANALYZE;
-- S6 filler 001
-- S6 filler 002
-- S6 filler 003
-- S6 filler 004
-- S6 filler 005
-- S6 filler 006
-- S6 filler 007
-- S6 filler 008
-- S6 filler 009
-- S6 filler 010
-- S6 filler 011
-- S6 filler 012
-- S6 filler 013
-- S6 filler 014
-- S6 filler 015
-- S6 filler 016
-- S6 filler 017
-- S6 filler 018
-- S6 filler 019
-- S6 filler 020
-- S6 filler 021
-- S6 filler 022
-- S6 filler 023
-- S6 filler 024
-- S6 filler 025
-- S6 filler 026
-- S6 filler 027
-- S6 filler 028
-- S6 filler 029
-- S6 filler 030
-- [STAGE 6 END]