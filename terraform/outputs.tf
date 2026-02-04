output "pages_url" {
  description = "GitHub Pages URL"
  value       = var.custom_domain != "" ? "https://${var.custom_domain}" : "https://${var.github_owner}.github.io/${var.repository_name}"
}

output "repository_url" {
  description = "GitHub repository URL"
  value       = github_repository.site.html_url
}

output "repository_name" {
  description = "Repository name"
  value       = github_repository.site.name
}
