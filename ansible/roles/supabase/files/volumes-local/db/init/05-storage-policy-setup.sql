DO
$DO$
    BEGIN
        IF EXISTS(SELECT FROM pg_catalog.pg_policies WHERE (schemaname, tablename, policyname) = ('storage', 'buckets', 'bucket-create'))
        THEN
            RAISE NOTICE 'Policy "bucket-create" already exists';
        ELSE
            CREATE POLICY "bucket-create" ON storage.buckets FOR INSERT WITH CHECK (auth.uid() = "owner");
        END IF;

        IF EXISTS(SELECT FROM pg_catalog.pg_policies WHERE (schemaname, tablename, policyname) = ('storage', 'buckets', 'bucket-update'))
        THEN
            RAISE NOTICE 'Policy "bucket-update" already exists';
        ELSE
            CREATE POLICY "bucket-update" ON storage.buckets FOR UPDATE USING (auth.uid() = "owner");
        END IF;

        IF EXISTS(SELECT FROM pg_catalog.pg_policies WHERE (schemaname, tablename, policyname) = ('storage', 'buckets', 'bucket-read'))
        THEN
            RAISE NOTICE 'Policy "bucket-read" already exists';
        ELSE
            CREATE POLICY "bucket-read" ON storage.buckets FOR SELECT USING (auth.role() = 'authenticated');
        END IF;

        IF EXISTS(SELECT FROM pg_catalog.pg_policies WHERE (schemaname, tablename, policyname) = ('storage', 'objects', 'object-create'))
        THEN
            RAISE NOTICE 'Policy "object-create" already exists';
        ELSE
            CREATE POLICY "object-create" ON storage.objects FOR INSERT WITH CHECK (auth.uid() = "owner");
        END IF;

        IF EXISTS(SELECT FROM pg_catalog.pg_policies WHERE (schemaname, tablename, policyname) = ('storage', 'objects', 'object-update'))
        THEN
            RAISE NOTICE 'Policy "object-update" already exists';
        ELSE
            CREATE POLICY "object-update" ON storage.objects FOR UPDATE USING (auth.uid() = "owner");
        END IF;

        IF EXISTS(SELECT FROM pg_catalog.pg_policies WHERE (schemaname, tablename, policyname) = ('storage', 'objects', 'object-read'))
        THEN
            RAISE NOTICE 'Policy "object-read" already exists';
        ELSE
            CREATE POLICY "object-read" ON storage.objects FOR SELECT USING (auth.role() = 'authenticated');
        END IF;
    END
$DO$;
