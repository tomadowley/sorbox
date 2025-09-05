-- Long SQL with stage anchors. Keep each stage separated by filler blocks.

-- [STAGE 1 START] prepare users
CREATE TEMP TABLE t_users AS
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
WHERE active = true AND name &lt;&gt; ''
ORDER BY name;
-- S2 filler 001
-- S2 filler 002
-- S2 filler 003
-- S2 filler 004
-- S2 filler 005
-- S2 filler 006
-- S2 filler 007
-- S2 filler 008
-- S2 filler 009
-- S2 filler 010
-- S2 filler 011
-- S2 filler 012
-- S2 filler 013
-- S2 filler 014
-- S2 filler 015
-- S2 filler 016
-- S2 filler 017
-- S2 filler 018
-- S2 filler 019
-- S2 filler 020
-- S2 filler 021
-- S2 filler 022
-- S2 filler 023
-- S2 filler 024
-- S2 filler 025
-- S2 filler 026
-- S2 filler 027
-- S2 filler 028
-- S2 filler 029
-- S2 filler 030
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
SELECT id, SUM(amount) AS revenue           -- feature keeps raw sum
FROM t_join
GROUP BY id
HAVING SUM(amount) &gt; 0;                     -- feature adds HAVING
-- S4 filler 001
-- S4 filler 002
-- S4 filler 003
-- S4 filler 004
-- S4 filler 005
-- S4 filler 006
-- S4 filler 007
-- S4 filler 008
-- S4 filler 009
-- S4 filler 010
-- S4 filler 011
-- S4 filler 012
-- S4 filler 013
-- S4 filler 014
-- S4 filler 015
-- S4 filler 016
-- S4 filler 017
-- S4 filler 018
-- S4 filler 019
-- S4 filler 020
-- S4 filler 021
-- S4 filler 022
-- S4 filler 023
-- S4 filler 024
-- S4 filler 025
-- S4 filler 026
-- S4 filler 027
-- S4 filler 028
-- S4 filler 029
-- S4 filler 030
-- [STAGE 4 END]

-- [STAGE 5 START] write outputs
INSERT INTO reporting.users_daily (id, name, revenue, yyyymm)
SELECT j.id, j.name, r.revenue, TO_CHAR(CURRENT_DATE, 'YYYYMM')
FROM t_join j
JOIN t_rev r USING (id);
-- S5 filler 001
-- S5 filler 002
-- S5 filler 003
-- S5 filler 004
-- S5 filler 005
-- S5 filler 006
-- S5 filler 007
-- S5 filler 008
-- S5 filler 009
-- S5 filler 010
-- S5 filler 011
-- S5 filler 012
-- S5 filler 013
-- S5 filler 014
-- S5 filler 015
-- S5 filler 016
-- S5 filler 017
-- S5 filler 018
-- S5 filler 019
-- S5 filler 020
-- S5 filler 021
-- S5 filler 022
-- S5 filler 023
-- S5 filler 024
-- S5 filler 025
-- S5 filler 026
-- S5 filler 027
-- S5 filler 028
-- S5 filler 029
-- S5 filler 030
-- [STAGE 5 END]

-- [STAGE 6 START] finalize
ANALYZE VERBOSE;  -- feature alternative finalization
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