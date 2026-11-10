# Creates or updates the repo's issue labels using the GitHub CLI (gh).
# Safe to re-run: --force updates labels that already exist.
#
# Usage (from the repo folder):
#   powershell -ExecutionPolicy Bypass -File scripts\setup-labels.ps1
#   powershell -ExecutionPolicy Bypass -File scripts\setup-labels.ps1 -RemoveOverlappingDefaults

param(
    [string]$Repo = "Psynapsyx/char-name-gen",
    [switch]$RemoveOverlappingDefaults
)

$labels = @(
    # Type: what kind of work it is
    @{ Name = "type:story";         Color = "1D76DB"; Description = "User-facing feature or change" },
    @{ Name = "type:bug";           Color = "D73A4A"; Description = "Something doesn't work as expected" },
    @{ Name = "type:task";          Color = "6F42C1"; Description = "Technical or housekeeping work" },
    @{ Name = "type:spike";         Color = "F9D0C4"; Description = "Time-boxed research" },

    # Priority: how soon it should be done
    @{ Name = "priority:P0";        Color = "B60205"; Description = "Critical - drop everything" },
    @{ Name = "priority:P1";        Color = "D93F0B"; Description = "High - this sprint" },
    @{ Name = "priority:P2";        Color = "FBCA04"; Description = "Medium - soon" },
    @{ Name = "priority:P3";        Color = "C2E0C6"; Description = "Low - someday" },

    # Area: which part of the project it touches
    @{ Name = "area:generator";     Color = "BFD4F2"; Description = "Name generation logic and data" },
    @{ Name = "area:ui";            Color = "BFD4F2"; Description = "User interface" },
    @{ Name = "area:tests";         Color = "BFD4F2"; Description = "Test code and test infrastructure" },
    @{ Name = "area:ci";            Color = "BFD4F2"; Description = "CI/CD, GitHub Actions, deployment" },
    @{ Name = "area:docs";          Color = "BFD4F2"; Description = "Documentation" },

    # Workflow
    @{ Name = "agent-ready";        Color = "0E8A16"; Description = "Meets the Definition of Ready; an agent can pick it up" },
    @{ Name = "needs-human";        Color = "5319E7"; Description = "Blocked on a decision or question for Jameson" }
)

foreach ($label in $labels) {
    Write-Host "Creating/updating $($label.Name)"
    gh label create $label.Name --repo $Repo --color $label.Color --description $label.Description --force
}

if ($RemoveOverlappingDefaults) {
    # GitHub's default labels that overlap with the type:* labels above.
    foreach ($name in @("bug", "enhancement", "documentation")) {
        Write-Host "Deleting default label '$name'"
        gh label delete $name --repo $Repo --yes
    }
}

Write-Host "Done. Labels:"
gh label list --repo $Repo
