@echo off
echo =====================================
echo WET Irrigation Brochure Compiler
echo =====================================
echo.

cd "c:\Users\Armand\Desktop\4th Year\Semester 2\Entrepreneurship\WET-Irrigation-Website\brochures"

echo Available brochure versions:
echo 1. WET-brochure-fixed.tex (Recommended - Working version)
echo 2. WET-brochure-simple.tex (Simple table layout)
echo 3. WET-brochure-trifold.tex (Advanced features)
echo.

set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo Compiling fixed brochure...
    pdflatex WET-brochure-fixed.tex
    set filename=WET-brochure-fixed.pdf
) else if "%choice%"=="2" (
    echo Compiling simple brochure...
    pdflatex WET-brochure-simple.tex
    set filename=WET-brochure-simple.pdf
) else if "%choice%"=="3" (
    echo Compiling trifold brochure...
    pdflatex WET-brochure-trifold.tex
    set filename=WET-brochure-trifold.pdf
) else (
    echo Invalid choice. Compiling recommended version...
    pdflatex WET-brochure-fixed.tex
    set filename=WET-brochure-fixed.pdf
)

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ SUCCESS: Brochure compiled successfully!
    echo 📄 Output file: %filename%
    echo.
    echo Opening PDF...
    start %filename%
) else (
    echo.
    echo ❌ ERROR: Compilation failed.
    echo.
    echo Troubleshooting:
    echo 1. Ensure MiKTeX is installed: https://miktex.org/download
    echo 2. Check that wet-logo.png exists in this folder
    echo 3. Verify all LaTeX packages are installed
)

echo.
echo Press any key to exit...
pause > nul
