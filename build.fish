set MSD_VERSION (python -c 'import secrets; print(secrets.token_urlsafe(8))')

set BASE_URL $argv[1]

VITE_MSD_VERSION=$MSD_VERSION yarn build \
    --base=$BASE_URL
mv ./dist/index.html ./dist/index.aspx

echo "Generated version: $MSD_VERSION"